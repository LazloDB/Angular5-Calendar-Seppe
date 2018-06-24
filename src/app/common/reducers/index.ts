import { ActionReducerMap } from '@ngrx/store';

import { events } from './events.reducer';

export interface State {
  events: any;
}

export const reducers: ActionReducerMap<any> = {
  events
};
