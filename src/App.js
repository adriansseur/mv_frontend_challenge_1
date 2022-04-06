import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, validate } from "./actions"
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import {Button, Form} from "react-bootstrap"

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
            <button className="btn btn-light" data-bs-toggle="collapse" type="button" data-bs-target="#depositContainer" role="button" aria-expanded="false" aria-controls="depositContainer">Deposit Funds</button>
          </div>
          <div className="col">
            <button className="btn btn-light" data-bs-toggle="collapse" type="button" data-bs-target="#withdrawContainer" role="button" aria-expanded="false" aria-controls="withdrawContainer">Withdraw Funds</button>
          </div>
        </div>

        {/* actions containers */}
        <div className="collapse" id="depositContainer">
          <Form>
            <Form.Group className="mb-3" controlId="depositContainer">
              <Form.Control onChange={processInput} placeholder="Enter amount" type="text" />
              <Button onClick={() => dispatch(increment(isValid))}>Deposit</Button>
            </Form.Group>
          </Form>
        </div>

        <div className="collapse" id="withdrawContainer">
          <Form>
            <Form.Group className="mb-3" controlId="withdrawContainer">
              <Form.Control onChange={processInput} placeholder="Enter amount" type="text" />
              <Button onClick={() => dispatch(decrement(isValid))}>Withdraw</Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;