'use babel';

export const GITHUB_CONNECTING = 'GITHUB_CONNECTING'
export const GITHUB_CONNECT_SUCCESS = 'GITHUB_CONNECT_SUCCESS'
export const GITHUB_CONNECT_FAILURE = 'GITHUB_CONNECT_FAILURE'
export const CONNECT_RANDOM = 'CONNECT_RANDOM'
export const DESTROY_LOGIN = 'DESTROY_LOGIN'

import Github from '../utils/github'

export function connectToGithub(token) {
  return (dispatch) => {
    dispatch(connecting())
    return new Github(token).getUserInfo((err, username, avatar) => {
      if(!err) {
        atom.config.set('atom-video.token', token)
        dispatch(connectSuccess({username, avatar}))
      }else {
        dispatch(connectFailure(err))
      }
    })
  }
}

function connecting() {
  return {
    type: GITHUB_CONNECTING
  }
}

function connectSuccess(user) {
  return {
    type: GITHUB_CONNECT_SUCCESS,
    user
  }
}

function connectFailure(error) {
  return {
    type: GITHUB_CONNECT_FAILURE,
    error
  }
}

export function connectRandom() {
  return {
    type: CONNECT_RANDOM
  }
}

export function destroyLogin() {
  return {
    type: DESTROY_LOGIN
  }
}
