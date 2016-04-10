'use babel';

import { combineReducers } from 'redux'
import github from './login'
import session from './session'

const rootReducer = combineReducers({
  github,
  session
})

export default rootReducer
