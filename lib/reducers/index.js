'use babel';

import { combineReducers } from 'redux'
import github from './github'

const rootReducer = combineReducers({
  github
})

export default rootReducer
