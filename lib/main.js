'use babel';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App.js'

const store = configureStore();

let root
let panel

module.exports = {
  activate() {
    root = document.createElement('div');
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      root
    );
    panel = atom.workspace.addHeaderPanel({item: root});
  },
  deactivate() {
    React.unmountComponentAtNode(root);
    panel.destroy();
  }
};
