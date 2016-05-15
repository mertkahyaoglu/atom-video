'use babel';

import _ from 'underscore-plus'

import {
  SESSION_CREATED,
  SESSION_DESTROYED,
  CALL_REQUEST,
  CALL_REQUEST_ENDED,
  CALLING,
  SHOW_NOTIFICATION,
  CLOSE_NOTIFICATION,
  CALL_STARTED,
  CALL_ENDED,
  ADD_STREAM,
  REMOVE_STREAM,
  RECEIVE_SELF_URL
} from '../actions/session'

export default function session(state = {
  session: {},
  callRequest: false,
  caller: "",
  callTarget: "",
  calling: false,
  notification: {},
  callStarted: false,
  streams: [],
  selfUrl: "",
}, action) {
  switch (action.type) {
    case SESSION_CREATED:
      return Object.assign({}, state, {
        session: action.session
      })
    case SESSION_DESTROYED:
      return Object.assign({}, state, {
        session: {},
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
    case SHOW_NOTIFICATION:
      return Object.assign({}, state, {
        calling: false,
        notification: {
          id: action.id,
          text: action.notification,
        }
      })
    case CLOSE_NOTIFICATION:
      return Object.assign({}, state, {
        notification: {}
      })
    case CALL_STARTED:
      return Object.assign({}, state, {
        callStarted: true
      })
    case CALL_ENDED:
      return Object.assign({}, state, {
        callStarted: false
      })
    case ADD_STREAM:
      return Object.assign({}, state, {
        streams: [
          {
            username: action.username,
            stream: action.stream
          },
          ...state.streams
        ]
      })
    case REMOVE_STREAM:
      return Object.assign({}, state, {
        streams: _.filter(state.streams, (stream) => action.username != stream.username)
      })
    case RECEIVE_SELF_URL:
      return Object.assign({}, state, {
        selfUrl: action.url
      })
    default:
      return state;
  }
}
