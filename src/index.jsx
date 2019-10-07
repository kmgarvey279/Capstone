import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import rootReducer from './redux/modules/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as saveData from './middleware/save-data';
import throttle from 'lodash.throttle';

let retrievedState = saveData.loadState();
const store = createStore(rootReducer, retrievedState);

store.subscribe(throttle(() => {
  saveData.saveState({
    saves: store.getState().saves
  });
}, 5000));

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

const render = (Component) => {
  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <Component/>
      </Provider>
    </HashRouter>,
    document.getElementById('react-app-root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    render(App)
  });
}
