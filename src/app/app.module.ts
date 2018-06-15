import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonthViewComponent } from './month/month-view/month-view.component';

import { DeviceService } from './services/device.service';

@NgModule({
  declarations: [
    AppComponent,
    MonthViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
