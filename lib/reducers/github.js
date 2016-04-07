'use babel';

import {
  GITHUB_CONNECT_SUCCESS,
  GITHUB_CONNECT_FAILURE
} from '../actions/github'

export default function github(state = {
  username: "",
  error: ""
}, action) {
  switch (action.type) {
    case GITHUB_CONNECT_SUCCESS:
      return Object.assign({}, state, {
        username: action.username,
        error: ""
      })
    case GITHUB_CONNECT_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        username: ""
      })
    default:
      return state;
  }
}
