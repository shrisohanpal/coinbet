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
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { useState } from "react";

const HomeScreen = () => {

  const [rakshak, setRakshak] = useState({width: "70%", alignSelf: "center"});
  var result = "Heads or Tails";
  const tossCoin = () => {
    setRakshak({width: "70%", alignSelf: "center", animation: `spin 1s cubic-bezier(0.4, 2.5, 0.6, 0.5)`});
    setTimeout(()=>{
      setRakshak({width: "70%", alignSelf: "center"});
    }, 1000);
  };

  const[betAmount, setBetAmount] = useState(10.39);
  const newAmt = (hty) => {
    console.log(hty)
    setBetAmount(500.25);
  };

  
  return (
    <div style={{marginLeft:'auto', marginRight:'auto', maxWidth:'400px'}}>
      <Card className="p-3 rounded">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <strong>Head, Tail, Head, Tail, Head, ...</strong>
            </Accordion.Header>
            <Accordion.Body>
              Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head,
              Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail,
              Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head,
              Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail,
              Head, Tail, Head, Tail, Head, Tail, Head, Tail,
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
      <Card className="my-3 p-3 rounded">
        
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
              <Form.Control type="number" placeholder="Amount" onInput={newAmt}/>
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
