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
import { useDispatch, useSelector } from "react-redux";
import { setCoinData } from "../slices/coinSlice";
import HistoryElement from "../components/HistoryElement";
import SpinningCoin from "../components/SpinningCoin";

const HomeScreen = () => {
  const [variableValue, setVariableValue] = useState(0);
  const [userLogin, setUserLogin] = useState(false);
  const [betAmount, setBetAmount] = useState(100);
  const newAmt = (hty) => {
    setBetAmount(Number(hty.target.value));
  };

  const coinData = useSelector((state) => state.coin);
  const dispatch = useDispatch();

  useEffect(() => {
    // setStatus(coinData.status);
    //setResult(coinData.result);
    //setHistory(coinData.history);

    const socket = io("", {
      autoConnect: true,
    });

    socket.on("variableChanged", (data) => {
      setVariableValue(data.value);

      dispatch(
        setCoinData({
          history: data.history,
          status: data.status,
          result: data.result,
        })
      );
    });

    socket.on("updateHistory", (data) => {
      //setHistory(data.history);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "400px" }}>
      <Card className="p-3 rounded">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              {coinData.history
                ? coinData.history[0] +
                  ", " +
                  coinData.history[1] +
                  ", " +
                  coinData.history[2] +
                  ", " +
                  coinData.history[3]
                : ""}
            </Accordion.Header>
            <Accordion.Body>
              {coinData.history?.map((e) => {
                return e + ", ";
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
      <Card className="my-3 p-3 rounded">
        <Card.Text>variable: {variableValue}</Card.Text>
        <Card.Text>Status: {coinData.status}</Card.Text>
        <Card.Text>Result: {coinData.result}</Card.Text>
        <SpinningCoin status={coinData.status} result={coinData.result}/>
        <Card.Text>Result: waiting...</Card.Text>

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
              // onClick={tossCoin}
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
