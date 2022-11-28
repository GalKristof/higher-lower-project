import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  chosenOne = "";
  isSubmitted = true;
  public username = "admin";
  public password = "admin";
  public confirmPassword = "";

  loginForm: any;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void{

    console.log("hi");

    this.loginForm = this.fb.group({
      username: [this.username, [Validators.required, Validators.minLength(3)]],
      password: [this.password],
      confirmPassword: [this.confirmPassword]
    });

  }

  forgetPassword(){}
  onSubmit(){
    if(this.chosenOne === "Regisztráció") return alert("Regisztráció jelenleg nem elérhető. Jelentkezz be a következő adatokkal: user: 'admin' és pass: 'admin'");
    if(this.chosenOne === "")
    {
      if(this.username !== "admin") return alert("Felhasználható nem található.");
      if(this.password !== "admin") return alert("Jelszó nem megfelelő.");
      return this.isSubmitted = true;
    }
  }

}
