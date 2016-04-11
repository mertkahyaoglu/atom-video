'use babel';

export const GITHUB_CONNECT_SUCCESS = 'GITHUB_CONNECT_SUCCESS'
export const GITHUB_CONNECT_FAILURE = 'GITHUB_CONNECT_FAILURE'
export const CONNECT_RANDOM = 'CONNECT_RANDOM'

import Github from '../utils/github'

export function connectToGithub(token) {
  return (dispatch) => {
    return new Github(token).getUserInfo((err, username, avatar) => {
      if(!err) {
        atom.config.set('atom-video.token', token)
        dispatch(connectSuccess(username, avatar))
      }else {
        dispatch(connectFailure(err))
      }
    })
  }
}

function connectSuccess(username, avatar) {
  return {
    type: GITHUB_CONNECT_SUCCESS,
    username,
    avatar
  }
}

function connectFailure(errorGithub) {
  return {
    type: GITHUB_CONNECT_FAILURE,
    errorGithub
  }
}

export function connectRandom(username) {
  return {
    type: CONNECT_RANDOM,
    username
  }
}
