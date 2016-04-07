'use babel';

import { render, init } from '../utils/render'
import { onActivate, onDeactivate } from './subscriptions'

let root
let panel

module.exports = {
  activate() {
    console.log("Activating")
    root = init()
    panel = atom.workspace.addHeaderPanel({item: root})
    render(root)

    onActivate()
  },
  deactivate() {
    console.log("Deactivating")
    panel.destroy()
    onDeactivate()
  }
}
