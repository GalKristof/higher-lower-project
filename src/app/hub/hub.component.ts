import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent {

  constructor(private router: Router, private _us: UserService){};

  ngOnInit():void {

    let isThereALoggedUser = false;
    let users = this._us.getUserArray();
    if((users.findIndex(n => n.isLoggedIn == true)) !== -1) isThereALoggedUser = true;

    if(!isThereALoggedUser) this.navigateBackToHomePage();
    else this.router.navigateByUrl('/dashboard');
  }


  navigateBackToHomePage()
  {
    this.router.navigateByUrl('/login');
  }

}
