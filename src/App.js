import React, { useState } from "react";
import Counter from "./componets/Counter/Counter";
import "./App.css";
import Timmer from "./componets/Timmer/Timmer";
import { Col, Container, Form, Row } from "react-bootstrap";

function App() {
  let [mode, setMode] = useState(true);
  let [alarm, setAlarm] = useState(false);

  return (
    <div className={alarm ? "alert" : ".app"}>
      <Container fluid="md">
        <Row className="justify-content-md-center m-5">
          <Col md={3}>
            <Form.Check
              disabled={alarm}
              type="switch"
              id="custom-switch"
              label={mode ? "Cambiar a Tiempo" : "Cambiar a Contador"}
              onChange={() => setMode(!mode)}
            />
          </Col>
        </Row>
      </Container>
      {mode ? (
        <Counter alarm={alarm} setAlarm={setAlarm} />
      ) : (
        <Timmer alarm={alarm} setAlarm={setAlarm} />
      )}
    </div>
  );
}

export default App;
