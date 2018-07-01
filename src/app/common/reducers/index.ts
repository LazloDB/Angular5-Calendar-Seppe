import { ActionReducerMap } from '@ngrx/store';

import { events } from './events.reducer';
import { addEvents } from './addEvent.reducer';

export interface State {
  events: any;
  addEvents: any;
}

export const reducers: ActionReducerMap<any> = {
  events,
  addEvents,
};
