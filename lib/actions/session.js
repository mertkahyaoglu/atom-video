'use babel';

export const PEERJS_CONNECT = 'PEERJS_CONNECT'
export const SESSION_CREATED = 'SESSION_CREATED'
export const SESSION_ENDED = 'SESSION_ENDED'
export const CALL_REQUEST = 'CALL_REQUEST'
export const CALL_REQUEST_ENDED = 'CALL_REQUEST_ENDED'
export const CALLING = 'CALLING'
export const CALLING_ENDED = 'CALLING_ENDED'

import Session from '../utils/session'

export function connectToPeer(username) {
  return (dispatch, getState) => {
    dispatch(calling(username))
    let session = getState().session.session
    session.connect(username)
  }
}

export function createSession(username) {
  return (dispatch) => {
    dispatch(sessionCreated(new Session(username)))
  }
}

function sessionCreated(session) {
  return {
    type: SESSION_CREATED,
    session
  }
}

export function callRequest(caller) {
  return {
    type: CALL_REQUEST,
    caller
  }
}

export function callRequestEnded() {
  return {
    type: CALL_REQUEST_ENDED
  }
}

export function calling(callTarget) {
  return {
    type: CALLING,
    callTarget
  }
}

export function callingEnded() {
  return {
    type: CALLING_ENDED
  }
}
