import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, validate } from "./actions"
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import {Button, Form, Accordion} from "react-bootstrap"

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

        {/* Deposit / Withdraw Accordion */}
        <Accordion>

          <Accordion.Item eventKey="0">
            <Accordion.Header>Deposit</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3" controlId="depositContainer">
                  <Form.Control onChange={processInput} placeholder="Enter amount" type="text" />
                  <Button onClick={() => dispatch(increment(isValid))}>Deposit</Button>
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Withdraw</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3" controlId="withdrawContainer">
                  <Form.Control onChange={processInput} placeholder="Enter amount" type="text" />
                  <Button onClick={() => dispatch(decrement(isValid))}>Withdraw</Button>
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </div>
    </div>
  );
}

export default App;