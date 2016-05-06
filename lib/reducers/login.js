'use babel';

import { randomUsername } from '../utils/helpers'

import {
  GITHUB_CONNECTING,
  GITHUB_CONNECT_SUCCESS,
  GITHUB_CONNECT_FAILURE,
  CONNECT_RANDOM,
  DESTROY_LOGIN
} from '../actions/login'

export default function login(state = {
  user: {},
  error: '',
  connecting: false
}, action) {
  switch (action.type) {
    case GITHUB_CONNECTING:
      return Object.assign({}, state, {
        connecting: true
      })
    case GITHUB_CONNECT_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        error: '',
        connecting: false
      })
    case GITHUB_CONNECT_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        user: {},
        connecting: false
      })
    case CONNECT_RANDOM:
      return Object.assign({}, state, {
        user: { username: randomUsername(), avatar: '' },
        error: '',
        connecting: false
      })
    case DESTROY_LOGIN:
      return Object.assign({}, state, {
        user: {},
        error: '',
        connecting: false
      })
    default:
      return state;
  }
}
