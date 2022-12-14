import React from 'react';
import ReactDOM from 'react-dom/client';
import './containers/css/index.css';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import builderReducer from './store/reducers/builder';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './store/saga/rootSaga';



const root = ReactDOM.createRoot(document.getElementById('root'));


const rootReducer=combineReducers({
  burger:builderReducer,
  orders:orderReducer,
  auth:authReducer
})

const sagaMiddleware=createSagaMiddleware()
//--------------- redux devtools setup---------
 const composeEnhancers =process.env.NODE_ENV==="development"? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null|| compose;

const store=createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk,sagaMiddleware))
  )

sagaMiddleware.run(rootSaga)  
root.render(
  // <React.StrictMode>
  <Provider store={store}>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
