import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Image,
  Accordion,
} from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetCoinQuery } from "../slices/coinApiSlice";
import HistoryElement from "../components/HistoryElement";

const HomeScreen = () => {
  const [variableValue, setVariableValue] = useState(0);
  const [status, setStatus] = useState();
  const [result, setResult] = useState();
  const [history, setHistory] = useState(["head", "tail"]);

  useEffect(() => {
    const socket = io("", {
      autoConnect: true,
    });

    socket.on("variableChanged", (data) => {
      setVariableValue(data.value);
      setStatus(data.status);
      setResult(data.result);
      setHistory(data.history);
    });

    socket.on("updateHistory", (data) => {
      setHistory(data.history);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [rakshak, setRakshak] = useState({ width: "70%", alignSelf: "center" });

  const tossCoin = () => {
    setRakshak({
      width: "70%",
      alignSelf: "center",
      animation: `spin 1s cubic-bezier(0.4, 2.5, 0.6, 0.5)`,
    });
    setTimeout(() => {
      setRakshak({ width: "70%", alignSelf: "center" });
    }, 1000);
  };

  const [betAmount, setBetAmount] = useState(10.39);
  const newAmt = (hty) => {
    console.log(hty);
    setBetAmount(500.25);
  };

  // var data, isLoading, error;
  const { data, isLoading, error } = useGetCoinQuery();

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "400px" }}>
      <Card className="p-3 rounded">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              {history
                ? history[0] +
                  ", " +
                  history[1] +
                  ", " +
                  history[2] +
                  ", " +
                  history[3]
                : ""}
            </Accordion.Header>
            <Accordion.Body>
              {history?.map((e) => {
                return e + ", ";
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
      <Card className="my-3 p-3 rounded">
        <Card.Text>variable: {variableValue}</Card.Text>
        <Card.Text>Status: {status}</Card.Text>
        <Card.Text>Result2: {result}</Card.Text>
        <Card.Img
          src={require("../assets/heads.png")}
          variant="top"
          // style={{ width: "70%", alignSelf: "center" }}
          style={rakshak}
        />

        <Form.Select className="my-3" aria-label="Default select example">
          <option>Select Your Side</option>
          <option value="1">Head</option>
          <option value="2">Tail</option>
        </Form.Select>

        <Row>
          <Col>
            <Form.Group className="my-1" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="number"
                placeholder="Amount"
                onInput={newAmt}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button
              className="my-1"
              disabled={false}
              type="submit"
              onClick={tossCoin}
              variant="primary"
            >
              BET {betAmount} INR
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HomeScreen;
