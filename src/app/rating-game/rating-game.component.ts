import { Component, OnInit } from '@angular/core';
import { GameData } from '../models/game.model';

@Component({
  selector: 'app-rating-game',
  templateUrl: './rating-game.component.html',
  styleUrls: ['./rating-game.component.css']
})

export class RatingGameComponent {
    
  _url = "https://api.rawg.io/api/games?key=883218e761854fcca6bc086a40ce5485";
  _gameData: GameData[] = [];
  canShowData = false;
  
  ngOnInit(): void{
    this.getGames();
  }
  gameData: GameData[] = [];
  
  alreadyGeneratedNumbers = [];
  showThis: number = 0;
  showThisToo: number = 0;
  generateNumbers(length: number)
  {
    this.showThis = Math.floor(Math.random() * length);
    this.showThisToo = this.showThis;
    while(this.showThisToo === this.showThis)
    {
      this.showThisToo = Math.floor(Math.random() * length);
    }

    console.log(this.showThis + " and " + this.showThisToo)

  }

  async getGames()
  {
    fetch(this._url)
    .then(response => response.json())
    .then(data => this.processData(data.results));
  }

  processData(datas: any)
  {
    for(let data of datas)
    {
      this.gameData.push(data);
    }
    this.generateNumbers(this.gameData.length);
    this.canShowData = true;

  }

}
