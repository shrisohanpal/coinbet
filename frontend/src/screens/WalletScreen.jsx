import { useState } from "react";
import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const WalletScreen = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Row>
          <Col>
            <h5>2500 INR</h5>
            Main Balance
          </Col>
          <Col style={{ alignContent: "center" }}>
            <Button>Deposit Now</Button>
          </Col>
        </Row>
      </Card>
      <Card className="my-3 p-3 rounded">
        <Row>
          <Col>
            <h5>1500 INR</h5>
            Bonus Balance
          </Col>
          <Col style={{ alignContent: "center" }}>
            <Button>Increase Now</Button>
          </Col>
        </Row>
      </Card>
      <Card className="my-3 p-3 rounded">
        <Row>
          <Col>
            <h5>5000 INR</h5>
            Winning Balance
          </Col>
          <Col style={{ alignContent: "center" }}>
            <Button onClick={handleShow}>Withdraw Now</Button>
          </Col>
        </Row>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h3 style={{ alignSelf: "center" }}>In Bank Account</h3>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              Enter Account Number:
              <Form.Control type="text" placeholder="Bank Account Number" />
            </Form.Group>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              Enter IFSC Code:
              <Form.Control type="text" placeholder="IFSC Code" />
            </Form.Group>
            <Button style={{ width: "100%" }}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WalletScreen;
