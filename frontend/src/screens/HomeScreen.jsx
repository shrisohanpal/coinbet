import { Card, Row, Col, Button, Image, Accordion } from "react-bootstrap";
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
            <Accordion.Header>Head, Tail, Head, Tail, Head, ...</Accordion.Header>
            <Accordion.Body>
            Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, Head, Tail, 
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
      <Card className="my-3 p-3 rounded">
        <Card.Img src={require("../assets/heads.png")} variant="top" />
        <Card.Title className="product-title">
          <strong>{result}</strong>
        </Card.Title>
        <Button
          className="m-3"
          disabled={false}
          type="submit"
          onClick={tossCoin}
          variant="primary"
        >
          Play Now
        </Button>
      </Card>
    </>
  );
};

export default HomeScreen;
