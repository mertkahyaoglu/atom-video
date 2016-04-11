'use babel';

import {
  SESSION_CREATED,
  CALL_REQUEST,
  CALL_REQUEST_ENDED,
  CALLING,
  CALLING_ENDED
} from '../actions/session'

export default function session(state = {
  session: {},
  callRequest: false,
  caller: "",
  callTarget: "",
  calling: false,
}, action) {
  switch (action.type) {
    case SESSION_CREATED:
      return Object.assign({}, state, {
        session: action.session
      })
    case CALL_REQUEST:
      return Object.assign({}, state, {
        callRequest: true,
        caller: action.caller
      })
    case CALL_REQUEST_ENDED:
      return Object.assign({}, state, {
        callRequest: false,
        calling: false
      })
    case CALLING:
      return Object.assign({}, state, {
        calling: true,
        callTarget: action.callTarget,
      })
    case CALLING_ENDED:
      return Object.assign({}, state, {
        calling: false
      })
    default:
      return state;
  }
}
