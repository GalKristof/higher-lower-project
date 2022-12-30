import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  chosenOne = "Bejelentkezés";
   
  get loggedUser() { return this.loggedInUser};

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^((?!BOT).)*$/)]),
    email: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('')
  });
  
  constructor(private fb: FormBuilder, private router: Router, private _us: UserService){}
  
  users: UserData[] = [];
  loggedInUser!: UserData;
  
  ngOnInit(): void{
    // Felhasználók lekérése
    this.users = this._us.getUserArray();
    const id = this.users.findIndex(n => n.isLoggedIn == true);
    if(id !== -1) this.router.navigateByUrl('/dashboard');

    // Jelszó változtatása esetén a jelszó egyeztetésének lekérdezése
    this.loginForm.controls['password'].valueChanges.subscribe(value => {
      this.loginForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  forgetPassword(){}

  usernameInUse = false;
  usernameNotCorrect = false;
  emailInUse = false;
  passwordNotCorrect = false;
  registrationDone = false;

  onSubmit(){

    this.usernameInUse = false;
    this.usernameNotCorrect = false;
    this.emailInUse = false;
    this.passwordNotCorrect = false;
    this.registrationDone = false;

    // Regisztráció
    if(this.chosenOne === "Regisztráció")
    {

      // Ellenőrizzük, hogy a felhasználónév vagy az email már használatban van-e, ha igen, akkor nem engedélyezzük a regisztrációt.
      const isUsernameExists = this.users.findIndex(n => n.username === this.loginForm.controls['username'].value);
      if(isUsernameExists !== -1) {this.loginForm.reset(); return this.usernameInUse = true;}
      const isEmailExists = this.users.findIndex(n => n.email === this.loginForm.controls['email'].value);
      if(isEmailExists !== -1) {this.loginForm.reset(); return this.emailInUse = true;}
      
      let newUser: UserData = {
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value,
        email: this.loginForm.controls['email'].value,
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
      this.switchChosenOne(false);
      this.registrationDone = true;
      return this.loginForm.reset();
    }
      
    
    // Bejelentkezés
    if(this.chosenOne === "Bejelentkezés")
    {
      // Ellenőrizzük, hogy létezik-e a felhasználó.
      console.log(this.users);
      console.log(this.loginForm.controls['username'].value as string);
      const i = this.users.findIndex(n => n.username === this.loginForm.controls['username'].value);
      if(i === -1) {this.loginForm.reset();return this.usernameNotCorrect = true;}

      // Ellenőrizzük, hogy megfelelő-e a jelszó a felhasználóhoz.
      if(this.users[i].password !== this.loginForm.controls['password'].value) {this.loginForm.reset();return this.passwordNotCorrect = true;}

      this.users[i].isLoggedIn = true;
      this.loginForm.reset();
      return this.router.navigateByUrl('/dashboard');;
    }
    
  }

  switchChosenOne(switchedValue: boolean)
  {
    this.usernameInUse = false;
    this.usernameNotCorrect = false;
    this.emailInUse = false;
    this.passwordNotCorrect = false;
    this.registrationDone = false;

    if(switchedValue) {
      this.chosenOne = "Regisztráció";
      this.loginForm.controls['email'].setValidators([Validators.required, Validators.email]);
      // A jelszó megerősítésénél elvárjuk, hogy megadja a jelszó megerősítést ÉS meg kell egyeznie a jelszóval.
      this.loginForm.controls['confirmPassword'].setValidators(Validators.compose([Validators.required, 
        (control: FormControl) => control.value !== this.loginForm.controls['password'].value ? { samePassword: true } : null]));
     }
     else{
       this.chosenOne = "Bejelentkezés";
       this.loginForm.controls['email'].clearValidators();
       this.loginForm.controls['confirmPassword'].clearValidators();
     }

     this.loginForm.controls['email'].updateValueAndValidity();
     return this.loginForm.controls['confirmPassword'].updateValueAndValidity();
  }


}
