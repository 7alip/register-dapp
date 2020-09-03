import React, { useEffect, useState } from 'react';
import './App.css';
import GetInfo from './components/GetInfo';
import SetInfo from './components/SetInfo';

function App({ drizzle }) {
  const [loading, setLoading] = useState(true);
  const [drizzleState, setDrizzleState] = useState(null);

  useEffect(() => {
    // subscribe to changes in the store
    const unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        setDrizzleState(drizzleState);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) return 'Loading Drizzle...';
  return (
    <div className="App">
      <h1>Register</h1>
      <h2>Using drizzle</h2>
      <p>
        Demo interact with a smart contract to call a view function (getInfo),
        which don't have gas costs <br />
        and other function (setInfo) that alter state at Blockchain and it costs
        gas. <br />
        It uses drizzle and drizzle-react to manage the web3 and smart contract
        connections.
      </p>
      <p>By Solange Gueiros</p>
      <GetInfo drizzle={drizzle} drizzleState={drizzleState} />
      <SetInfo drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  );
}

export default App;
