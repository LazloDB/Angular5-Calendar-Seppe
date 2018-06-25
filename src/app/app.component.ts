import { Component, OnInit } from '@angular/core';
import 'normalize.css';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  today: Date;
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('nl');
  }


  ngOnInit() {
    this.today = new Date();
  }
}
