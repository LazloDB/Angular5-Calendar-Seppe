import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../common/reducers';

@Component({
  selector: 'ldb-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() day: any;
  @Input() today: any;
  @Input() events: any;

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  getShift(routine) {
    switch(routine) {
      case 'X':
        return 'Vrij';
      case 'N':
        return 'Nacht';
      case 'D':
        return 'Dag';
      case 'V':
        return 'Vroege';
      case 'L':
        return 'Late';
      default:
        break;
    }
  }

  openEvents() {
    if (this.events.length > 0) {
      this.store.dispatch({type: 'SHOW_MODAL', payload: this.events});
    }
  }
}
