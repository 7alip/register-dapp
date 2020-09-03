import React, { useState, useEffect } from 'react';

function GetInfo({ drizzle, drizzleState }) {
  const [dataKey, setDataKey] = useState(null);

  useEffect(() => {
    (async function init() {
      if (window.ethereum) {
        await window.ethereum.enable();

        const contract = drizzle.contracts.Register;
        // let drizzle know we want to watch the `myString` method
        const _dataKey = contract.methods['getInfo'].cacheCall();
        // save the `dataKey` to local component state for later reference
        setDataKey(_dataKey);
      }
    })();
  }, []);

  // get the contract state from drizzleState
  const { Register } = drizzleState.contracts;

  // using the saved `dataKey`, get the variable we're interested in
  const info = Register.getInfo[dataKey];

  // if it exists, then we display its value
  return (
    <div>
      <h2>GetInfo Component</h2>
      <p>Info: {info && info.value}</p>
    </div>
  );
}

export default GetInfo;
