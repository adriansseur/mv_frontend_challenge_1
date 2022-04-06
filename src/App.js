import React from "react";
import { useSelector, useDispatch } from "react-redux"
import {increment, decrement, validate} from "./actions"

function App() {
  const balance = useSelector(state => state.balance)
  const isValid = useSelector(state => state.isValid)
  const dispatch = useDispatch()

  function processInput(e) {
    // only numbers and decimals, limit 2 decimals, no commas, no currency symbols
    const regex = /^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/
    if (e.target.value && regex.test(e.target.value)) {
      const inputNum = parseFloat(parseFloat(e.target.value).toFixed(2))
      dispatch(validate(inputNum))
    } else {
      dispatch(validate(0))
    }
  }

  return (
    <div className="App">
      {/* balance can be improved to have a comma when needed*/}
      <h1>Balance: ${parseFloat(balance).toFixed(2)}</h1>
      <input onChange={processInput} className="input" type="text" />
      <br />
      <button onClick={() => dispatch(increment(isValid))}>Deposit</button>
      <br />
      <button onClick={() => dispatch(decrement(isValid))}>Withdraw</button>
    </div>
  );
}

export default App;
