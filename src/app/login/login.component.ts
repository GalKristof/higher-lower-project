import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  chosenOne = "";
   
  get loggedUser() { return this.loggedInUser};
  
  public username = "";
  public email = "";
  public password = "";
  public confirmPassword = "";
  
  loginForm: any;
  
  constructor(private fb: FormBuilder, private router: Router, private _us: UserService){}
  
  users: UserData[] = [];
  loggedInUser!: UserData;
  
  ngOnInit(): void{
    
    this.loginForm = this.fb.group({
      username: [this.username, [Validators.required, Validators.minLength(3)]],
      email: [this.email],
      password: [this.password, Validators.required],
      confirmPassword: [this.confirmPassword]
    });

    this.users = this._us.getUserArray();

  }

  forgetPassword(){}

  onSubmit(){
    
    // Regisztráció
    if(this.chosenOne === "Regisztráció")
    {

      // Ellenőrizzük, hogy a felhasználónév vagy az email már használatban van-e, ha igen, akkor nem engedélyezzük a regisztrációt.
      const isUsernameExists = this.users.findIndex(n => n.username === this.username);
      if(isUsernameExists !== -1) return alert("Felhasználónév foglalt.")
      const isEmailExists = this.users.findIndex(n => n.email === this.email);
      if(isEmailExists !== -1) return alert("E-mail cím foglalt.")
      
      let newUser: UserData = {
        username: this.username,
        password: this.password,
        email: this.email,
        isLoggedIn: false,
        whichGameIsCurrentlyPlaying: "none",
        userStatistics: {
          ratingGameTopScore: 0,
          releasedGameTopScore: 0,
          xp: 0,
          lvl: 0
        }
      }
      this._us.fillUser(newUser);
      alert("Regisztráció sikeres! Most már bejelentkezhetsz.")
      return this.switchChosenOne(false);
    }
      
    
    // Bejelentkezés
    if(this.chosenOne === "")
    {
      // Ellenőrizzük, hogy létezik-e a felhasználó.
      const i = this.users.findIndex(n => n.username === this.username);
      console.log(i);
      if(i === -1) return alert("Felhasználható nem található.")

      // Ellenőrizzük, hogy megfelelő-e a jelszó a felhasználóhoz.
      if(this.users[i].password !== this.password) return alert("Jelszó nem megfelelő.")
      // this.loggedInUser = this.users[i];

      this.users[i].isLoggedIn = true;
      return this.router.navigateByUrl('/dashboard');;
    }
    
  }

  switchChosenOne(switchedValue: boolean)
  {
    if(switchedValue) {
      this.chosenOne = "Regisztráció";
      this.loginForm.controls['email'].setValidators([Validators.required, Validators.email]);
      this.loginForm.controls['confirmPassword'].setValidators([Validators.required]);
     }
     else{
       this.chosenOne = "";
       this.loginForm.controls['email'].clearValidators();
       this.loginForm.controls['confirmPassword'].clearValidators();
     }

     this.loginForm.controls['email'].updateValueAndValidity();
     return this.loginForm.controls['confirmPassword'].updateValueAndValidity();
  }


}
