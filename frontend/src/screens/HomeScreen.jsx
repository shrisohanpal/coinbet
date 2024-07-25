import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Image,
  Accordion,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  var result = "Heads or Tails";
  const tossCoin = () => {
    console.log("sfd");
    result = "Tails";
  };

  return (
    <>
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
          style={{ width: "70%", alignSelf: "center" }}
        />
        <Form.Select className="my-3" aria-label="Default select example">
          <option>Select Your Side</option>
          <option value="1">Head</option>
          <option value="2">Tail</option>
        </Form.Select>

        <Row>
          <Col>
            <Form.Group className="my-1" controlId="exampleForm.ControlInput1">
              <Form.Control type="number" placeholder="Amount" />
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
              BET 10.00 INR
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default HomeScreen;
