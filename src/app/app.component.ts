import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private _us: UserService, private dc: DashboardComponent){}

  ngOnInit()
  {
    const simulationIterationTime = 100;
    this._us.generateBotUsers();
  }
  

}
