'use babel';

export const PEERJS_CONNECT = 'PEERJS_CONNECT'
export const SESSION_CREATED = 'SESSION_CREATED'
export const SESSION_ENDED = 'SESSION_ENDED'

import Session from '../utils/session'

export function connectToPeer(username) {
  return (dispatch, getState) => {
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
