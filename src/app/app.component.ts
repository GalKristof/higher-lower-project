import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private _us: UserService){}

  ngOnInit()
  {
    console.log(this._us.generateBotUsers());
  }
  

}
