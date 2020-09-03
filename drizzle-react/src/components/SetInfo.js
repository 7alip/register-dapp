import React, { useState } from 'react';

function SetInfo({ drizzle, drizzleState }) {
  const [stackId, setStackId] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const setValue = () => {
    const contract = drizzle.contracts.Register;

    // let drizzle know we want to call the `set` method with `value`
    const _stackId = contract.methods['setInfo'].cacheSend(inputValue, {
      from: drizzleState.accounts[0],
    });

    // save the `stackId` for later reference
    setStackId(_stackId);
  };

  const getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    //console.log(txHash);
    //console.log(transactions[txHash]);
    if (transactions[txHash] != null)
      if (transactions[txHash].receipt != null)
        console.log('receipt \n', transactions[txHash].receipt);

    // otherwise, return the transaction status
    return `Transaction status: ${
      transactions[txHash] ? transactions[txHash].status : 'confirmation...'
    }`;
  };

  return (
    <div>
      <h2>SetInfo Component</h2>
      <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button onClick={setValue}>Set Info</button>
      <div>{getTxStatus()}</div>
    </div>
  );
}

export default SetInfo;
