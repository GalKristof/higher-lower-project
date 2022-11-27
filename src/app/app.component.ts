import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gsw-angular';
  currentDate!: string;

  constructor(){}

  ngOnInit(): void{
    timer(0, 1000).subscribe(() => {
      this.changeBackgroundColor();
    })
  }


  changeBackgroundColor(){
    // A hátteret dinamikusan változtatjuk. Jelen idő pl 12:10:20 -> plusz mindegyik értékhez 40-et hozzáadunk, hogy élénkebb színeket kapjunk.
    // A példa időnk 12:10:20 így 52:50:60 lenne, ebből egy hexadecimális 6 jegyű számot kapunk, #-el ellátjuk és kész a színkód: #525060.
    this.currentDate = "#" + (new Date().getHours()+40).toString() + (new Date().getMinutes()+40).toString() + (new Date().getSeconds()+40).toString();
  }

}
