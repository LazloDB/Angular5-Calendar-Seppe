import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// reducers
import { reducers } from './common/reducers/index';
import { events } from './common/reducers/events.reducer';

// components
import { AppComponent } from './app.component';
import { MonthViewComponent } from './month/month-view/month-view.component';
import { DayComponent } from './month/day/day.component';
import { EventDisplayComponent } from './event-display/event-display.component';
import { DraggableButtonComponent } from './draggable-button/draggable-button.component';

// services
import { DeviceService } from './services/device.service';

// directives
import { MovableDirective } from './common/directives/movable.directive';
import { DraggableDirective } from './common/directives/draggable.directive';
import { EventAddComponent } from './event-add/event-add.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MonthViewComponent,
    DayComponent,
    EventDisplayComponent,
    DraggableButtonComponent,
    MovableDirective,
    DraggableDirective,
    EventAddComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      initialState: {
        events: { isVisible: false, events: null }
      }
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
