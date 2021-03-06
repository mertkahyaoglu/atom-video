'use babel'

import { CompositeDisposable } from 'atom'
import { unmount, togglePanel, getStore } from '../utils/render'

import { connectToGithub } from '../actions/login'
import { destroy } from '../actions/session'

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
      getStore().dispatch(connectToGithub(newValue))
    })
  )
}

export function onDeactivate() {
  getStore().dispatch(destroy())
  window.onresize = null
  unmount()
  subscriptions.dispose()
}
