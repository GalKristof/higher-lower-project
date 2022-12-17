import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameData } from '../models/game.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-the-game',
  templateUrl: './the-game.component.html',
  styleUrls: ['./the-game.component.css'],
  animations: [
    trigger('showExtraPoint', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('hide => show', animate('200ms ease-in')),
      transition('show => hide', animate('150ms ease-out'))
    ])
  ]
})

export class TheGameComponent {
    
  _url = "https://api.rawg.io/api/games?page_size=40&key=883218e761854fcca6bc086a40ce5485";
  gameData: GameData[] = [];
  canShowData = false;
  gotError = false;
  gameType = "rating";
  currentScore = 0;
  
  statusOfShowExtraPoint = false;
  get showExtraPoint(){
    return this.statusOfShowExtraPoint ? 'show' : 'hide';
  }

  constructor(private _us: UserService, private router: Router){}
  users = this._us.getUserArray();
  loggedInUser = this.users.findIndex(n => n.isLoggedIn == true);
  currentGame: string = "none";
  question: string = "";
  
  ngOnInit(): void{
    if(this.loggedInUser != -1 ) this.currentGame = this.users[this.loggedInUser].whichGameIsCurrentlyPlaying;
    if(this.loggedInUser == -1 || this.currentGame == "none") this.router.navigateByUrl("/hub");
    else this.getGames();

    if(this.currentGame == "Értékelő-játék") this.question = "Melyiknek nagyobb az értékelése";
    if(this.currentGame == "Kiadott év-játék") this.question = "Melyik játékot adták ki később";
  }
  
  alreadyGeneratedNumbers: number[] = [];
  leftElement!: GameData;
  rightElement!: GameData;
  generateElements(length: number)
  {
    // Legeneráljuk az első két számot, úgy, hogy biztosak legyünk benne, hogy két azonos szám ne keletkezzen.
    // Eközben a már legenerált számokat eltároljuk, hogy később ellenőrizni tudjuk azokat, hiszen
    // nem szeretnénk, hogy megjelenjen egy játék újra a későbbiekben.
    let firstGeneratedNumber = Math.floor(Math.random() * length);
    this.alreadyGeneratedNumbers.push(firstGeneratedNumber);
    let secondGeneratedNumber = Math.floor(Math.random() * length);
    while(this.alreadyGeneratedNumbers.includes(secondGeneratedNumber)) secondGeneratedNumber = Math.floor(Math.random() * this.gameData.length);
    this.alreadyGeneratedNumbers.push(secondGeneratedNumber);

    // Az így legenerált számok segítségével pedig betudjuk állítani a legelső két elemet.
    this.leftElement = this.gameData[firstGeneratedNumber];
    this.rightElement = this.gameData[secondGeneratedNumber];
  }
  

  async getGames()
  {
    // Lekérdezzük az API adatokat, ha megfelelő a reakció, akkor elindítjuk az adatok feldolgozását, egyébként hibaüzenetet kapunk válaszul.
    fetch(this._url)
    .then(response => response.json())
    .then(data => this.processData(data.results))
    .catch(() =>
    {
      this.apiError();
      throw new Error("Something went wrong with API.");
    });
  }

  processData(datas: any)
  {
    // Feldolgozzuk az adatokat. A beérkezett adatokat feltöltjük a tömbünkbe.
    for(let data of datas)
    {
      this.gameData.push(data);
    }

    console.log(this.gameData.length);

    // Legeneráljuk az első két számot ami szükség lesz a játékhoz.
    this.generateElements(this.gameData.length);

    // Aktiváljuk a 'canShowData' változót -> ez kikapcsolja a 'loading' animációt az elején és betölti a játékot, mivel ebben a pillanatban már biztos, hogy van elég adatunk.
    this.canShowData = true;
  }

  submitAnswer(bigger: boolean)
  {
    let i = 0;
    // bigger = A játékos által beérkezett interakció. True érték esetén nagyobbra nyomott, false érték esetén a kisebbre.
    if(bigger)
    {
      if(this.currentGame == "Értékelő-játék")
      {
        // ha nagyobbra nyomott és eltalálta (tehát a jobb oldali érték nagyobb, vagy egyenlő a bal oldali értékkel) akkor menjen tovább, egyébként fejezze be a játékot
        if(this.rightElement.rating >= this.leftElement.rating) return this.goNext();
        return this.endGame();
      }
      else if(this.currentGame == "Kiadott év-játék")
      {
        // mint az eggyel fentebb lévő, csak másik játék, itt a kiadott évet nézzük
        if(this.rightElement.released >= this.leftElement.released) return this.goNext();
        return this.endGame();
      }
    }
    if(this.currentGame == "Értékelő-játék")
    {
      // ugyan az, mint az előbb, csak a kisebbre nyomott interakció
      if(this.rightElement.rating <= this.leftElement.rating) return this.goNext();
    }
    else if(this.currentGame == "Kiadott év-játék")
    {        
      // mint az eggyel fentebb lévő, csak másik játék, itt a kiadott évet nézzük
      if(this.rightElement.released <= this.leftElement.released) return this.goNext();
      return this.endGame();
    }
    return this.endGame(); 
  }

  goNext()
  {
    // Növeljük a pontszámot, mert eltalálta, illetve elindítjuk a +1 pont animációját.
    this.currentScore++;
    this.statusOfShowExtraPoint = true;
    setTimeout(() => {
      this.statusOfShowExtraPoint = false;
    }, 200+650) // 200ms = animáció bejövetele & 650ms = eddig marad látható a pontszám, ezt követően eltűnik. 

    // Legenerálunk egy új számot, majd addig generáljuk újra, amíg biztosak vagyunk abban, hogy ez egy olyan számot fog eredményezni, amellyel korábban még nem dolgoztunk.
    // A generálás során ügyelünk arra, hogy ne lépjük túl a tömb határait, különben egy örök while ciklus indulna el.
    // Ha a tömb határát elértük, akkor a játékos megnyeri a játékot.
    if(this.currentScore >= this.gameData.length-1) return this.wonTheGame();

    let generateNewNumber = Math.floor(Math.random() * this.gameData.length);
    while(this.alreadyGeneratedNumbers.includes(generateNewNumber)) generateNewNumber = Math.floor(Math.random() * this.gameData.length);
    this.alreadyGeneratedNumbers.push(generateNewNumber);

    // A bal oldali elem lesz a korábbi jobb oldali elem, míg a jobb oldalra egy újabb elemet generálunk.
    this.leftElement = this.rightElement;
    this.rightElement = this.gameData[Math.floor(Math.random() * this.gameData.length)];
  }

  endGame()
  {
    console.log("end of game");
  }

  wonTheGame()
  {
    console.log("nyerté bics");
  }
  
  apiError()
  {
    this.gotError = true;
  }

}
