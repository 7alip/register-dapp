import React from 'react';
import './App.css';
import { newContextComponents } from '@drizzle/react-components';

const { AccountData, ContractData, ContractForm } = newContextComponents;

function App({ drizzle, drizzleState, initialized }) {
  if (!initialized) return 'Loading...';

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <h2>Using drizzle-react-components</h2>
        <p>
          Demo interact with a smart contract to call a view function (getInfo),
          which don't have gas costs <br />
          and other function (setInfo) that alter state at Blockchain and it
          costs gas. <br />
          It uses drizzle, drizzle-react and drizzle-react-components to manage
          the web3 connection and smart contract interactions. <br />
        </p>
        <p>By Solange Gueiros</p>
      </div>

      <div className="section">
        <h2>Active Account</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={4}
        />
      </div>

      <div className="section">
        <h2>Register</h2>
        <p>
          <strong>Info: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="Register"
            method="getInfo"
          />
        </p>
        <ContractForm drizzle={drizzle} contract="Register" method="setInfo" />
      </div>
    </div>
  );
}

export default App;
