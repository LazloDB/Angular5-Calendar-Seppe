import { Action } from '../models/action';

export function events(state: any, action: Action) {
    switch (action.type) {
        case 'CLOSE_MODAL':
            return action.payload;
        case 'SHOW_MODAL':
            return {
              ...state,
              isVisible: true,
              events: action.payload
            }
        default:
            return state;
    }
}
