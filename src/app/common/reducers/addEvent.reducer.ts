import { Action } from '../models/action';

export function addEvents(state: any, action: Action) {
    switch (action.type) {
        case 'CLOSE_ADD_EVENT_MODAL':
            return action.payload;
        case 'SHOW_ADD_EVENT_MODAL':
            return {
              ...state,
              isVisible: true,
              events: action.payload
            }
        default:
            return state;
    }
}
