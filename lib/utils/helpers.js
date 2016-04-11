'use babel';

import rn from 'random-number'

export function randomUsername() {
  return 'User' + rn({
    min:  0,
    max:  10000,
    integer: true
  })
}
