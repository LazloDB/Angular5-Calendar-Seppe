import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

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

@NgModule({
  declarations: [
    AppComponent,
    MonthViewComponent,
    DayComponent,
    EventDisplayComponent,
    DraggableButtonComponent,
    MovableDirective,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {
      initialState: {
        events: { isVisible: false, events: null }
      }
    }),
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
