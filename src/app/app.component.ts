import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserData } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private _us: UserService, private dc: DashboardComponent){}

  ngOnInit()
  {
    this._us.generateBotUsers();
  }
  

}
