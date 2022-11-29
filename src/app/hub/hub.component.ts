import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent {

  constructor(private router: Router, private login: LoginComponent){};

  ngOnInit():void {
    console.log(this.login.SubmitValue);
    if(!this.login.SubmitValue) this.navigateBackToHomePage();
    else this.router.navigateByUrl('/dashboard')
  }


  navigateBackToHomePage()
  {
    this.router.navigateByUrl('/login');
  }

}
