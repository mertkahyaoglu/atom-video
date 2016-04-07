'use babel';

import React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import App from '../containers/App.js'

const store = configureStore()
let root

export function render(target) {
  ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>,
    target
  )
}

export function unmount() {
  console.log("Unmounting")
  ReactDOM.unmountComponentAtNode(root)
}

export function init() {
  console.log("Initializing root")
  root = document.createElement('div')
  root.hidden = true
  return root
}

export function togglePanel() {
  root.hidden = !root.hidden
}

export function getStore() {
  return store
}
