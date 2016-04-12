'use babel';

export const PEERJS_CONNECT = 'PEERJS_CONNECT'
export const SESSION_CREATED = 'SESSION_CREATED'
export const SESSION_ENDED = 'SESSION_ENDED'
export const CALL_REQUEST = 'CALL_REQUEST'
export const CALL_REQUEST_ENDED = 'CALL_REQUEST_ENDED'
export const CALLING = 'CALLING'
export const CALLING_ENDED_SUCCESS = 'CALLING_ENDED_SUCCESS'
export const CALLING_ENDED_DECLINE = 'CALLING_ENDED_DECLINE'
export const CALLING_ENDED_NO_CONNECTION = 'CALLING_ENDED_NO_CONNECTION'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'

import Session from '../utils/session'

export function connectToPeer(username) {
  return (dispatch, getState) => {
    dispatch(calling(username))
    let session = getState().session.session
    session.connect(username)
  }
}

export function answerCall(answer) {
  return (dispatch, getState) => {
    dispatch(callRequestEnded())
    let session = getState().session.session
    session.answer(answer)
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

export function callRequest(connection) {
  return {
    type: CALL_REQUEST,
    connection
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

export function callingEnded(status) {
  return (dispatch, getState) => {
    switch (status) {
      case 1:
        dispatch(callingEndedWithSuccess())
        break;
      case 2:
        dispatch(callingEndedWithDecline())
        break;
      case 3:
        dispatch(callingEndedWithNoConnection())
        break;
      default:

    }
    setTimeout(() => {
      dispatch(closeNotification())
    }, 3000)
  }
}

function closeNotification() {
  return {
    type: CLOSE_NOTIFICATION
  }
}

function callingEndedWithSuccess() {
  return {
    type: CALLING_ENDED_SUCCESS
  }
}

function callingEndedWithDecline() {
  return {
    type: CALLING_ENDED_DECLINE
  }
}

function callingEndedWithNoConnection() {
  return {
    type: CALLING_ENDED_NO_CONNECTION
  }
}
