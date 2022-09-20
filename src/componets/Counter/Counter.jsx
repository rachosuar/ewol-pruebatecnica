import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

const Counter = ({ alarm, setAlarm }) => {
  //
  let [counter, setCounter] = useState(0);
  let [timer, setTimer] = useState(0);
  let [condition, setCondition] = useState("");
  let [vueltas, setVueltas] = useState([{ counter: 0 }]);

  //sumar de a 1
  let aumentar = () => {
    setCounter(counter + 1);
  };
  //restar de a 1
  let restar = () => {
    setCounter(counter - 1);
  };
  // iniciar contador ascendente
  let startCounter = () => {
    setCondition("up");
    if (!timer) {
      setTimer(
        setInterval(() => {
          setCounter((prevCounter) => prevCounter + 1);
        }, 1000)
      );
    } else if (timer) {
      clearInterval(timer);
      setTimer(null);
      setCondition("");
    }
  };
  //iniciar temporizador
  let startTemp = () => {
    setCondition("down");
    if (!timer) {
      countDown();
    } else if (timer) {
      setTimer(null);
      clearInterval(timer);
      setCondition("");
    }
  };
  let countDown = () => {
    setTimer(
      setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000)
    );
  };
  useEffect(() => {
    if (counter === 0 && condition === "down") {
      activateAlarm();
    } // eslint-disable-next-line
  }, [counter, condition]);

  //activar alarma
  let activateAlarm = () => {
    for (let i = 0; i < 1000; i++) clearInterval(i);
    setAlarm(true);
    setCondition("");
  };
  //contador a 0
  let resetear = () => {
    setCounter(0);
  };
  //mostrar vueltas
  let mostrarVuelta = (counter) => {
    let newObject = { counter, nombre: "Sin Nombre" };
    setVueltas(vueltas.concat(newObject));
  };
  //borrar vueltas
  let borrarVueltas = () => {
    setVueltas([{ counter: 0 }]);
  };
  //agregar nombre a vuelta
  let addName = (e, index) => {
    let newName = e.target.value;
    vueltas[index].nombre = newName;
    setVueltas(vueltas);
  };
  return (
    <>
      <Container fluid="sm" className="contenedor-pequeño">
        <Row className="justify-content-sm-center">
          <Col sm={2}>
            <Button variant="primary" disabled={alarm} onClick={resetear}>
              {" "}
              Resetear{" "}
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-3">
          <Col sm={2}>
            <Button variant="warning" disabled={alarm} onClick={aumentar}>
              {" "}
              Aumentar
            </Button>
          </Col>
          <Col sm={2}>
            <Badge
              bg="dark"
              text="light"
              style={{ fontSize: "2.8rem", fontWeight: "300" }}
            >
              {counter}
            </Badge>
          </Col>
          <Col sm={2}>
            <Button variant="warning" disabled={alarm} onClick={restar}>
              {" "}
              Restar{" "}
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={3} className="m-4">
            <Button
              variant="primary"
              disabled={counter < 0 || condition === "down" || alarm}
              onClick={startCounter}
            >
              {condition === "up" ? "Detener Cronometro" : "Iniciar Cronometro"}
            </Button>
          </Col>

          <Col md={3} className="m-4">
            {" "}
            {alarm ? (
              <Button variant="primary" onClick={() => setAlarm(false)}>
                {" "}
                TEMPORIZADOR OK{" "}
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled={condition === "up" || counter <= 0}
                onClick={startTemp}
              >
                {condition === "down"
                  ? "Detener Temporizador"
                  : "Iniciar Temporizador"}
              </Button>
            )}
          </Col>
        </Row>
        {condition === "up" ? (
          <Row className="justify-content-md-center">
            <Col md={3} className="mt-5">
              <Button
                variant="secondary"
                onClick={() => mostrarVuelta(counter)}
              >
                {" "}
                Mostrar Vuelta{" "}
              </Button>
            </Col>
            {vueltas.length > 1 ? (
              <Col md={3} className="mt-5">
                <Button variant="secondary" onClick={borrarVueltas}>
                  {" "}
                  Borrar Vuelta{" "}
                </Button>
              </Col>
            ) : null}
          </Row>
        ) : null}
        {vueltas.length > 1 ? (
          <div>
            {vueltas.map((vuelta, index) =>
              index === 0 ? null : (
                <Row
                  key={Math.random()}
                  className="justify-content-md-center mt-4"
                >
                  <Col md={3}>
                    {" "}
                    Vuelta {index}
                    {"---->"}
                    {vuelta.counter} Diferencia{"     "}
                    {vuelta.counter - vueltas[index - 1].counter}{" "}
                  </Col>
                  <Col md={2}>
                    <form onChange={(e) => addName(e, index)}>
                      {" "}
                      <input
                        className="forms"
                        defaultValue={vuelta.nombre}
                        type="text"
                      ></input>
                    </form>
                  </Col>
                </Row>
              )
            )}
          </div>
        ) : null}
      </Container>
    </>
  );
};

export default Counter;
