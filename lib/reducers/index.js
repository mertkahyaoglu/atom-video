'use babel';

import { combineReducers } from 'redux'
import login from './login'
import session from './session'

const rootReducer = combineReducers({
  login,
  session
})

export default rootReducer
