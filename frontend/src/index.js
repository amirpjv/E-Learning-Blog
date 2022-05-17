import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './bootstrap.min.css' //bootwatch
import 'bootswatch/dist/slate/bootstrap.min.css';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);