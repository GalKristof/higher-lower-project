import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface GameMode {
  id: number;
  name: string;
  paragraphs: string[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class DashboardComponent {
  constructor(private _us: UserService, private router: Router, private http: HttpClient){}
  gamemodes: GameMode[] = [];

  users = this._us.getUserArray();
  loggedInUser = this.users.findIndex(n => n.isLoggedIn == true)
  user: UserData = {
    username: '-',
    password: '-',
    email: '-',
    isLoggedIn: true,
    whichGameIsCurrentlyPlaying: "none",
    userStatistics: {
      ratingGameTopScore: 0,
      releasedGameTopScore: 0,
      xp: 0,
      lvl: 0
    }
  };

  // Azok a tömbök, amik a legjobb játékosokat tartalmazzák.
  // Ez alapján készül a Ranglista.
  bestRatingGamePlayers: UserData[] = [];
  bestReleasedGamePlayers: UserData[] = [];
  bestXpPlayers: UserData[] = [];
  bestLvlPlayers: UserData[] = [];
  
  // Meghatározzuk, hogy mely oszlopokat jelenítsen meg a ranglista.
  displayedColumns: string[] = ['username', 'ratingGameTopScore'];

  // A "jelszó megváltoztatása" gombra True lesz az értéke, ekkor jelenik meg a jelszó változtatási panel.
  passwordCurrentlyChanging = false;

  ngOnInit(): void{
    this.checkIfLoggedInUserExists();
    this.getGamemodes();
    this.sortPlayers();
  }

  // Az összes játékmód bekérése
  async getGamemodes() {
    this.http.get('/assets/gamemodes.json').subscribe(data => {
      this.gamemodes = data as GameMode[];
    });    
  }

  // Legjobb játékosok szortírozása
  sortPlayers() {
    this.bestRatingGamePlayers = this.users.sort((a, b) => b.userStatistics.ratingGameTopScore - a.userStatistics.ratingGameTopScore).slice(0, 10);
    this.bestReleasedGamePlayers = this.users.sort((a, b) => b.userStatistics.releasedGameTopScore - a.userStatistics.releasedGameTopScore).slice(0, 10);
    this.bestLvlPlayers = this.users.sort((a, b) => b.userStatistics.lvl - a.userStatistics.lvl).slice(0, 10);
    this.bestXpPlayers = this.users.sort((a, b) => b.userStatistics.xp - a.userStatistics.xp).slice(0, 10);
  }

  // Ellenőrizzük, hogy létezik-e bejelentkezett felhasználó, amennyiben nem, akkor küldjük vissza az elosztóba.
  checkIfLoggedInUserExists()
  {
    if(this.loggedInUser == -1) return this.router.navigateByUrl('/hub');
    return this.user = this.users[this.users.findIndex(n => n.isLoggedIn == true)]
  }

  // Kijelentkezés
  logOut()
  {
    this.user.isLoggedIn = false;
    return this.router.navigateByUrl('/hub')
  }

  // A jelszó megváltoztatása
  OnChangePassword()
  {

  }

  startGame(game: number)
  {
    if(game == 0) this.user.whichGameIsCurrentlyPlaying = "Értékelő-játék";
    if(game == 1) this.user.whichGameIsCurrentlyPlaying = "Kiadott év-játék";
    if(game < 0 || game > 1) return alert("HIBA: A játék nem létezik.");
    return this.router.navigateByUrl("/thegame");
  }

}
