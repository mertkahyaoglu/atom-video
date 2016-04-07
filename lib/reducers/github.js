'use babel'

import {
  GITHUB_CONNECT_SUCCESS,
  GITHUB_CONNECT_FAILURE
} from '../actions/github'

export default function github(state = {
  username: ""
}, action) {
  switch (action.type) {
    case GITHUB_CONNECT_SUCCESS:
      return Object.assign({}, state, {
        username: state.username
      })
    case GITHUB_CONNECT_FAILURE:
      return Object.assign({}, state, {
        error: state.error
      })
    default:
      return state;
  }
}
