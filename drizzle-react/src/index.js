import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// 1. Import drizzle, drizzle-react, and your contract artifacts.
import { Drizzle, generateStore } from '@drizzle/store';
import { DrizzleContext } from '@drizzle/react-plugin';
import Register from './contracts/Register.json';

// 2. Setup the drizzle instance.
const options = { contracts: [Register] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
  <React.StrictMode>
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {({ drizzle, drizzleState, initialized }) => (
          <App
            drizzle={drizzle}
            drizzleState={drizzleState}
            initialized={initialized}
          />
        )}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
