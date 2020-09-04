import React, { useState, useEffect } from 'react';
import Rsk3 from '@rsksmart/rsk3';
import './App.css';
import Register from './contracts/Register.json';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [data, setData] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function init() {
      try {
        const rsk3 = new Rsk3('http://localhost:4444');
        // Load first account
        const [account] = await rsk3.getAccounts();
        setAccount(account);

        // // Check which network is active on rsk3
        const networkId = await rsk3.net.getId();

        // Check if the smart contract has been published on that network
        const networkData = Register.networks[networkId];
        if (networkData) {
          const contract = new rsk3.Contract(Register.abi, networkData.address);
          setContract(contract);
          const info = await contract.methods.getInfo().call();
          setData(info);
        } else {
          window.alert('Smart contract not deployed to detected network.');
        }
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    contract.methods
      .setInfo(inputValue)
      .send({ from: account })
      .once('receipt', receipt => {
        setData(inputValue);
        setInputValue('');
      });
  };

  return (
    <div className="App">
      <div>
        <h1>Register using React</h1>
        {contract && <p>Contract Address: {contract.address}</p>}
        <p>Information: {data}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button type="submit">Set</button>
      </form>
    </div>
  );
}

export default App;
