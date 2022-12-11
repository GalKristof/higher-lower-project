import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  igen = true;
  
  constructor(private _us: UserService, private router: Router){}
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

  ngOnInit(): void{
    this.checkIfLoggedInUserExists();
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

  // Jelszó megváltoztatása gombra jelenik meg
  ShowChangePassword()
  {
    
  }

  startGame(game: number){
    if(game == 0) this.user.whichGameIsCurrentlyPlaying = "Értékelő-játék";
    if(game == 1) this.user.whichGameIsCurrentlyPlaying = "Kiadott év-játék";
    return this.router.navigateByUrl("/thegame");
  }

}
