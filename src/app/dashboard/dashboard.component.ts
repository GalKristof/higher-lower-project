import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface GameMode {
  id: number;
  name: string;
  paragraphs: string[];
  playable: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class DashboardComponent {
  service: any;
  
  constructor(private _us: UserService, private router: Router, private http: HttpClient, private fb: FormBuilder, private cd: ChangeDetectorRef){}
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
  displayedColumns: string[] = ['iteration', 'username', 'ratingGameTopScore'];

  // A "jelszó megváltoztatása" gombra True lesz az értéke, ekkor jelenik meg a jelszó változtatási panel.
  passwordCurrentlyChanging = false;

  // Jelszó megváltoztatása form
  currentPassword = "";
  newPassword = "";
  changePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  passwordChanged = false;
  passwordChangeError = false;

  
  ngOnInit(): void{
    this.CheckIfLoggedInUserExists();
    this.GetGamemodes();
    this.SortPlayers();
  }

    // Az összes játékmód bekérése
    async GetGamemodes() {
    this.http.get('/assets/gamemodes.json', { observe: 'body' }).subscribe(data => {
      this.gamemodes = data as GameMode[];
    });
  }

  // Legjobb játékosok szortírozása, tulajdonság alapján, TOP 10.
  SortPlayers() {
    this.bestRatingGamePlayers = this.users.sort((a, b) => b.userStatistics.ratingGameTopScore - a.userStatistics.ratingGameTopScore).slice(0, 10);
    this.bestReleasedGamePlayers = this.users.sort((a, b) => b.userStatistics.releasedGameTopScore - a.userStatistics.releasedGameTopScore).slice(0, 10);
    this.bestLvlPlayers = this.users.sort((a, b) => b.userStatistics.lvl - a.userStatistics.lvl).slice(0, 10);
    this.bestXpPlayers = this.users.sort((a, b) => b.userStatistics.xp - a.userStatistics.xp).slice(0, 10);
    this.cd.markForCheck();
  }


  // Ellenőrizzük, hogy létezik-e bejelentkezett felhasználó, amennyiben nem, akkor küldjük vissza az elosztóba.
  CheckIfLoggedInUserExists()
  {
    if(this.loggedInUser == -1) return this.router.navigateByUrl('/hub');
    return this.user = this.users[this.users.findIndex(n => n.isLoggedIn == true)]
  }

  // Kijelentkezés
  LogOut()
  {
    this.user.whichGameIsCurrentlyPlaying = "none";
    this.user.isLoggedIn = false;
    return this.router.navigateByUrl('/hub')
  }

  // A jelszó megváltoztatása
  OnChangePassword()
  {
    // Formba beírt jelenlegi jelszó és felhasználó jelenlegi jelszava egyezik, hívjuk meg a jelszóváltoztatási függvényt
    if(this.changePasswordForm.controls['currentPassword'].value === this.users[this.loggedInUser].password) return this.ChangeTheUserPassword();
    
    // Egyébként error, sikertelen form küldés.
    this.changePasswordForm.reset();
    return this.passwordChangeError = true;
  }

  ChangeTheUserPassword()
  {
    // A jelszó megváltoztatása
    this.users[this.loggedInUser].password = this.changePasswordForm.controls['currentPassword'].value as string;

    // Form értékek alapértelmezettre állítása
    this.passwordCurrentlyChanging = false;
    this.passwordChanged = true;
    this.passwordChangeError = false;
    this.changePasswordForm.reset();

    // 5 másodpercig kiírunk egy "Sikeres jelszóváltoztatás!" feliratot, majd ezt követően újra megjelenítjük a jelszó megváltoztatása gombot.
    setTimeout(() => {this.passwordChanged = false;}, 5000);
  }

  StartGame(game: number)
  {
    if(game == 0) this.user.whichGameIsCurrentlyPlaying = "Értékelő-játék";
    if(game == 1) this.user.whichGameIsCurrentlyPlaying = "Kiadott év-játék";
    if(game < 0 || game > 1) return alert("HIBA: A játék nem létezik.");
    return this.router.navigateByUrl("/thegame");
  }

}
