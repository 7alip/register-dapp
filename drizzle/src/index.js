import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// import drizzle functions and contract artifact
import { Drizzle } from "@drizzle/store";
import Register from "./contracts/Register.json";

// let drizzle know what contracts we want and how to access our test blockchain
const options = {
  contracts: [Register],
};

// setup the drizzle store and drizzle
const drizzle = new Drizzle(options);

ReactDOM.render(
  <React.StrictMode>
    <App drizzle={drizzle} />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
