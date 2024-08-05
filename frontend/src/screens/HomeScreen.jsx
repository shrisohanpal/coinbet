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

const socket = io("", {
  autoConnect: true,
});

const HomeScreen = () => {
  const [variableValue, setVariableValue] = useState(0);
  const [userLogin, setUserLogin] = useState(false);
  const [betted, setBetted] = useState(false);
  const [betside, setBetside] = useState(null);
  const [betAmount, setBetAmount] = useState(100);
  const newAmt = (hty) => {
    setBetAmount(Number(hty.target.value));
  };

  const coinData = useSelector((state) => state.coin);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("variableChanged", (data) => {
      setVariableValue(data.value);
      if (data.status == "Betting") {
        setBetted(false);
        // console.log("JKL " + data.status);
      }
      if (data.status == "Showing") {
        // likhna ho kuch to likh diyo
      }
      dispatch(
        setCoinData({
          history: data.history,
          status: data.status,
          result: data.result,
        })
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const betHandler = () => {
    setBetted(true);
    socket.emit("betted", {
      side: betside,
      userId: userInfo._id,
      amount: betAmount,
    });
  };

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
        <Card.Text>
          Betted?:{" "}
          {coinData.status == "Showing" && betted == true
            ? betside == coinData.result
              ? "YOU WON"
              : "YOU LOSE"
            : "nahi lagaya"}
        </Card.Text>

        <SpinningCoin status={coinData.status} result={coinData.result} />
        <Card.Text className="mx-auto my-2">
          <strong>Result: {coinData.result}</strong>
        </Card.Text>

        <Form.Select
          onChange={(e) => {
            setBetside(e.target.value);
          }}
          className="my-3"
          aria-label="Default select example"
        >
          <option>Select Your Side</option>
          <option value="HEAD">Head</option>
          <option value="TAIL">Tail</option>
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
              disabled={coinData.status != "Betting" || betted}
              type="submit"
              onClick={betHandler}
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
