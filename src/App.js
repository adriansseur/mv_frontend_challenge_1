import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, validate } from "./actions"
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"

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
    // background
    <div className="bg-primary bg-opacity-25 vh-100 d-flex justify-content-center align-items-center">

      {/* white container */}
      <div className="row h-50 w-75 bg-white">

        {/* balance container */}
        <div className="row d-flex align-items-center">
          <h1>Balance: ${parseFloat(balance).toFixed(2)}</h1>
        </div>

        {/* actions nav */}
        <div className="row">
          <div className="col">
            <a data-bs-toggle="collapse" href="#depositContainer" role="button" aria-expanded="false" aria-controls="depositContainer">Deposit Funds</a>
          </div>
          <div className="col">
            <a data-bs-toggle="collapse" href="#withdrawContainer" role="button" aria-expanded="false" aria-controls="withdrawContainer">Withdraw Funds</a>
          </div>
        </div>

        {/* actions containers */}
        <div className="collapse" id="depositContainer">
          <form>
              <input className="form-control" onChange={processInput} placeholder="Enter amount" type="text" />
              <button className="btn btn-primary" onClick={() => dispatch(increment(isValid))}>Deposit</button>
          </form>
        </div>

        <div className="collapse" id="withdrawContainer">
        <form>
              <input className="form-control" onChange={processInput} placeholder="Enter amount" type="text" />
              <button className="btn btn-primary" onClick={() => dispatch(decrement(isValid))}>Withdraw</button>
          </form>
        </div>
      </div>
        
        
      </div>
  );
}

export default App;
