import React from 'react';
import './App.css';
import GetInfo from './components/GetInfo';
import SetInfo from './components/SetInfo';

function App({ drizzle, drizzleState, initialized }) {
  if (!initialized) return 'Loading...';

  return (
    <div className="App">
      <h1>Register</h1>
      <h2>Using drizzle-react</h2>
      <p>
        Demo interact with a smart contract to call a view function (getInfo),
        which don't have gas costs <br />
        and other function (setInfo) that alter state at Blockchain and it costs
        gas. <br />
        It uses drizzle and drizzle-react to manage the web3 connection and
        smart contract interactions.
      </p>
      <p>By Solange Gueiros</p>
      <GetInfo drizzle={drizzle} drizzleState={drizzleState} />
      <SetInfo drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  );
}

export default App;
