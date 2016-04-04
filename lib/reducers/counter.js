'use babel';

import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

export default function counter(state = {
  counter: 0
}, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return Object.assign({}, state, {
        counter: state.counter + 1
      })
    case DECREMENT_COUNTER:
      return Object.assign({}, state, {
        counter: state.counter - 1
      })
    default:
      return state;
  }
}
