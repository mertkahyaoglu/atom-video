'use babel';

import {
  SESSION_CREATED
} from '../actions/session'

export default function session(state = {
  session: {},
}, action) {
  switch (action.type) {
    case SESSION_CREATED:
      return Object.assign({}, state, {
        session: action.session
      })
    default:
      return state;
  }
}
