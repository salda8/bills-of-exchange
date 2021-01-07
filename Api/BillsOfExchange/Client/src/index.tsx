import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/style/scss/site.scss';
import App from './App';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { configureStore, IApplicationState } from './store';
import AxiosGlobalConfig from './config/axios.config';
import './config/fa.config';
import * as serviceWorker from './serviceWorker';

AxiosGlobalConfig.setup();

const history = createBrowserHistory();
const initialState: IApplicationState = (window as any)?.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
    <ToastContainer
     autoClose={3500}
     draggable={false}
     newestOnTop={true}
     position='top-center'
    />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
