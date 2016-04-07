'use babel'

import { CompositeDisposable } from 'atom'
import { unmount, togglePanel } from '../utils/render'

let subscriptions

export function onActivate() {
  subscriptions = new CompositeDisposable

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-video:toggle': togglePanel
    })
  )

  subscriptions.add(
    atom.config.onDidChange('atom-video.token', ({newValue}) => {
      //dispatch(changeToken(newValue))
      console.log(newValue);
    })
  )
}

export function onDeactivate() {
  window.onresize = null
  unmount()
  subscriptions.dispose()
}
