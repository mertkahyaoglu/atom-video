'use babel'

export const GITHUB_CONNECT = 'GITHUB_CONNECT'
export const GITHUB_CONNECT_SUCCESS = 'GITHUB_CONNECT_SUCCESS'
export const GITHUB_CONNECT_FAILURE = 'GITHUB_CONNECT_FAILURE'

import Github from '../utils/github'

export function connect(token) {
  return (dispatch) => {
    return new Github(token).getUsername((err, username) => {
      if(!err) {
        dispatch(connect_success(username))
      }else {
        dispatch(connect_failure(err))
      }
    })
  }
}

function connect_success(username) {
  return {
    type: GITHUB_CONNECT_SUCCESS,
    username
  }
}

function connect_failure(error) {
  return {
    type: GITHUB_CONNECT_FAILURE,
    error
  }
}
