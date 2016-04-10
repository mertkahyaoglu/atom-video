'use babel';

import randomstring from 'randomstring'

import {
  GITHUB_CONNECT_SUCCESS,
  GITHUB_CONNECT_FAILURE,
  CONNECT_RANDOM
} from '../actions/login'

export default function login(state = {
  username: "",
  errorGithub: "",
  avatar: ""
}, action) {
  switch (action.type) {
    case GITHUB_CONNECT_SUCCESS:
      return Object.assign({}, state, {
        username: action.username,
        avatar: action.avatar,
        errorGithub: ""
      })
    case GITHUB_CONNECT_FAILURE:
      return Object.assign({}, state, {
        errorGithub: action.errorGithub,
        username: "",
        avatar: ""
      })
    case CONNECT_RANDOM:
      return Object.assign({}, state, {
        username: randomstring.generate(8),
        avatar: ""
      })
    default:
      return state;
  }
}
