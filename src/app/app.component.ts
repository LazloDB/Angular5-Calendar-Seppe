import { Component, OnInit } from '@angular/core';
import 'normalize.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  today: Date;
  constructor() {

  }

  ngOnInit() {
    this.today = new Date();
  }
}
