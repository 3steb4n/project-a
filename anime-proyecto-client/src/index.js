import React from 'react';
import ReactDOM from 'react-dom';
import './header-side-footer.css';
import './index.css';
import './dir_anime.css'
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import configureStore from './store'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/es/integration/react'
// <Provider store={store}>
//   <App />

// </Provider>
const { persistor, store } = configureStore()

const onBeforeLift = () => {
  // take some action before the gate lifts
}
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} onBeforeLift={onBeforeLift} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
