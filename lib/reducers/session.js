'use babel';

import {
  SESSION_CREATED,
  CALL_REQUEST,
  CALL_REQUEST_ENDED,
  CALLING,
  CALLING_ENDED_SUCCESS,
  CALLING_ENDED_DECLINE,
  CALLING_ENDED_NO_CONNECTION,
  CLOSE_NOTIFICATION,
} from '../actions/session'

export default function session(state = {
  session: {},
  callRequest: false,
  caller: "",
  callTarget: "",
  calling: false,
  callingStatus: 0
}, action) {
  switch (action.type) {
    case SESSION_CREATED:
      return Object.assign({}, state, {
        session: action.session
      })
    case CALL_REQUEST:
      return Object.assign({}, state, {
        callRequest: true,
        connection: action.connection
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
    case CALLING_ENDED_SUCCESS:
      return Object.assign({}, state, {
        calling: false,
        callingStatus: 1,
      })
    case CALLING_ENDED_DECLINE:
      return Object.assign({}, state, {
        calling: false,
        callingStatus: 2,
      })
    case CALLING_ENDED_NO_CONNECTION:
      return Object.assign({}, state, {
        calling: false,
        callingStatus: 3,
      })
    case CLOSE_NOTIFICATION:
      return Object.assign({}, state, {
        calling: false,
        callingStatus: 0,
      })
    default:
      return state;
  }
}
