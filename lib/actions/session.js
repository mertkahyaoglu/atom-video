'use babel';

export const PEERJS_CONNECT = 'PEERJS_CONNECT'
export const SESSION_CREATED = 'SESSION_CREATED'
export const SESSION_DESTROYED = 'SESSION_DESTROYED'
export const CALL_REQUEST = 'CALL_REQUEST'
export const CALL_REQUEST_ENDED = 'CALL_REQUEST_ENDED'
export const CALLING = 'CALLING'
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const CALL_STARTED = 'CALL_STARTED'
export const CALL_ENDED = 'CALL_ENDED'
export const ADD_STREAM = 'ADD_STREAM'
export const REMOVE_STREAM = 'REMOVE_STREAM'
export const RECEIVE_SELF_URL = 'RECEIVE_SELF_URL'
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'

import Session from '../utils/session'
import _ from 'underscore-plus'

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
    session.answerCall(answer)
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

function destroySession() {
  return {
    type: SESSION_DESTROYED
  }
}

export function destroy() {
  return (dispatch, getState) => {
    let session = getState().session.session
    session.destroy()
    dispatch(destroySession())
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
  return (dispatch) => {
    switch (status) {
      case 1:
        dispatch(showNotification(1, "Call accepted."))
        break;
      case 2:
        dispatch(showNotification(2, "Call declined."))
        break;
      case 3:
        dispatch(showNotification(3, "Exited."))
        break;
      case 4:
        dispatch(showNotification(4, "Unavailable ID."))
        break;
      case 5:
        dispatch(showNotification(5, "Network Error."))
        break;
      case 6:
        dispatch(showNotification(6, "Peer Unavailable."))
        break;
      default:
        break
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

function showNotification(id, notification) {
  return {
    type: SHOW_NOTIFICATION,
    id,
    notification
  }
}

export function callStarted() {
  return {
    type: CALL_STARTED
  }
}

export function callEnded() {
  return {
    type: CALL_ENDED
  }
}

export function exitCall() {
  return (dispatch, getState) => {
    let session = getState().session.session
    session.exitCall()
  }
}

export function addStream(username, stream) {
  return {
    type: ADD_STREAM,
    username,
    stream
  }
}

export function removeStream(username) {
  return {
    type: REMOVE_STREAM,
    username
  }
}

function getMedia(options, success) {
  navigator.webkitGetUserMedia(options, success, (err) => console.log(err));
}

function receiveSelfUrl(url) {
  return {
    type: RECEIVE_SELF_URL,
    url
  }
}

export function getSelfUrl() {
  return (dispatch) => {
    getMedia({audio: false, video: true}, (stream) => {
      dispatch(receiveSelfUrl(window.URL.createObjectURL(stream)))
    })
  }
}
