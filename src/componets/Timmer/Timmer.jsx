import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

const Timmer = ({ alarm, setAlarm }) => {
  //
  let [sec, setSec] = useState(0);
  let [min, setMin] = useState(0);
  let [hour, setHour] = useState(0);
  let [timer, setTimer] = useState([]);
  let [condition, setCondition] = useState("");
  let [vueltas, setVueltas] = useState([{ hour: 0, min: 0, sec: 0 }]);
  // sumar de a 1
  let aumentar = () => {
    setCondition("upmanual");
    setMin(min + 1);
    if (min === 59) {
      setMin(0);
      setHour(hour + 1);
    }
  };
  //restar de a 1
  let restar = () => {
    setCondition("downmanual");
    if (hour === 0 && min === 0) {
      return;
    }
    setMin(min - 1);
    if (min === 0 && hour > 0) {
      setMin(59);
      setHour(hour - 1);
    }
  };
  //iniciar cronometro
  let startCounter = () => {
    setCondition("up");
    if (!timer) {
      setTimer(
        setInterval(() => {
          setSec((prevSec) => prevSec + 1);
        }, 10)
      );
    } else if (timer) {
      clearInterval(timer);
      setTimer(null);
      setCondition("");
    }
  };
  //incitar temporizador
  let startTemp = () => {
    if (!timer) {
      setCondition("down");
      setSec(99);
      if (min > 1) setMin(min - 1);
      countDown();
    } else if (timer) {
      clearInterval(timer);
      setTimer(null);
      setCondition("");
    }
  };
  let countDown = () => {
    setTimer(
      setInterval(() => {
        setSec((prevSec) => prevSec - 1);
      }, 10)
    );
  };
  useEffect(() => {
    //activar alarm
    if (condition === "down" && hour === 0 && min === 0 && sec === 1) {
      setSec(0);
      setMin(0);
      clearInterval(timer);
      setAlarm(true);
      setCondition("");
    }
    if (condition === "up" && sec >= 99) {
      setSec(0);
      setMin((prevMin) => prevMin + 1);
    }

    if (condition === "up" && min === 60) {
      setMin(0);
      setHour((prevHour) => prevHour + 1);
    }
    if (condition === "down" && sec === 0) {
      setSec(99);
      setMin((prevMin) => prevMin - 1);
    }
    if (condition === "down" && min === 0 && hour > 0) {
      setMin(60);
      setHour((prevHour) => prevHour - 1);
    }

    // eslint-disable-next-line
  }, [sec, min, hour, condition, timer]);

  // resetear contador
  let resetear = () => {
    setHour(0);
    setMin(0);
    setSec(0);
    setCondition("restart");
  };
  //  mostrar vueltas
  let mostrarVuelta = (hour, min, sec) => {
    let newObject = { hour, min, sec, nombre: "Sin Nombre" };
    setVueltas(vueltas.concat(newObject));
    console.log(vueltas);
  };
  // borrar vueltas
  let borrarVueltas = () => {
    setVueltas([{ hour: 0, min: 0, sec: 0, nombre: "Sin Nombre" }]);
  };
  // agregar nombre
  let addName = (e, index) => {
    let newName = e.target.value;
    vueltas[index].nombre = newName;
    setVueltas(vueltas);
  };
  // actualizar contador
  let numbers =
    `${hour}`.padStart(2, 0) +
    ` ` +
    `:` +
    ` ` +
    `${min}`.padStart(2, 0) +
    ` ` +
    `:` +
    ` ` +
    `${sec}`.padStart(2, 0);

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
            <Button
              variant="warning"
              disabled={alarm}
              onClick={aumentar}
              onMouseEnter={() => setCondition("")}
            >
              {" "}
              Aumentar
            </Button>
          </Col>
          <Col sm={4}>
            {condition === "up" ||
            condition === "down" ||
            condition === "upmanual" ||
            condition === "downmanual" ||
            condition === "restart" ? (
              <Badge
                bg="dark"
                text="light"
                style={{
                  fontSize: "2rem",
                  width: "17.5rem",
                  height: "4.5rem",
                }}
              >
                <span className="numbers">{numbers} </span>
              </Badge>
            ) : (
              <Badge
                bg="dark"
                text="light"
                style={{
                  fontSize: "2rem",
                  width: "17.5rem",
                  height: "4.5rem",
                }}
              >
                <div className="clockContainer">
                  <form
                    key={1234}
                    onChange={(e) => setHour(+e.target.value)}
                    onMouseEnter={() => setCondition("")}
                  >
                    {" "}
                    <input
                      className="hour"
                      defaultValue={`${hour}`.padStart(2, 0)}
                      type="text"
                    ></input>
                  </form>{" "}
                  <span className="twodots">:</span>
                  <form key={3456} onChange={(e) => setMin(+e.target.value)}>
                    {" "}
                    <input
                      className="hour"
                      defaultValue={`${min}`.padStart(2, 0)}
                      type="text"
                    ></input>
                  </form>{" "}
                  <span className="twodots">:</span>
                  <form key={5678} onChange={(e) => setSec(+e.target.value)}>
                    {" "}
                    <input
                      className="hour"
                      defaultValue={`${sec}`.padStart(2, 0)}
                      type="text"
                    ></input>
                  </form>
                </div>
              </Badge>
            )}
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
              disabled={min < 0 || condition === "down" || alarm}
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
                disabled={
                  condition === "up" || (hour <= 0 && min <= 0 && sec <= 0)
                }
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
            <Col md={3} className="mt-4">
              <Button
                variant="secondary"
                onClick={() => mostrarVuelta(hour, min, sec)}
              >
                {" "}
                Mostrar Vuelta{" "}
              </Button>
            </Col>
            {vueltas.length > 1 ? (
              <Col md={3} className="mt-4">
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
                  <Col md={4}>
                    {" "}
                    Vuelta {index}
                    {"------->"}
                    {`${vuelta.hour}`.padStart(2, 0)}:
                    {`${vuelta.min}`.padStart(2, 0)}:
                    {`${vuelta.sec}`.padStart(2, 0)} Diferencia {"       "}
                    {`${vuelta.hour - vueltas[index - 1].hour}`.padStart(2, 0)}:
                    {`${vuelta.min - vueltas[index - 1].min}`.padStart(2, 0)}:
                    {`${Math.abs(
                      vuelta.sec - vueltas[index - 1].sec
                    )}`.padStart(2, 0)}{" "}
                  </Col>
                  <Col md={3}>
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

export default Timmer;
