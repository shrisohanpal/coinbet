import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const WalletScreen = () => {
  const [depositeAmt, setDepositeAmt] = useState(null);
  const [withdrawAmt, setWithdrawAmt] = useState(null);
  const [mainAmt, setMainAmt] = useState("");
  const [bonusAmt, setBonusAmt] = useState("");
  const [winningAmt, setWinningAmt] = useState("");

  const [showDepositeModal, setShowDepositeModal] = useState(false);
  const handleDepositeClose = () => setShowDepositeModal(false);
  const handleDepositeShow = () => setShowDepositeModal(true);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const handleWithdrawClose = () => setShowWithdrawModal(false);
  const handleWithdrawShow = () => setShowWithdrawModal(true);

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setMainAmt(userInfo.mainAmt);
    setBonusAmt(userInfo.bonusAmt);
    setWinningAmt(userInfo.winningAmt);
  }, [userInfo.mainAmt, userInfo.bonusAmt, userInfo.winningAmt]);

  const dispatch = useDispatch();
  const depositeHandler = async (e) => {
    setShowDepositeModal(false);
    e.preventDefault();
    try {
      const res = await updateProfile({
        mainAmt: userInfo.mainAmt + depositeAmt,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Deposited successfully");
      setDepositeAmt(null);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const withdrawHandler = async (e) => {
    setShowWithdrawModal(false);
    e.preventDefault();
    if (userInfo.winningAmt >= withdrawAmt) {
      try {
        const res = await updateProfile({
          winningAmt: userInfo.winningAmt - withdrawAmt,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Withdraw successfully");
        setWithdrawAmt(null);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("Not Enough Balance!");
    }
  };

  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Row>
          <Col>
            <h5>{mainAmt} INR</h5>
            Main Balance
          </Col>
          <Col style={{ alignContent: "center" }}>
            <Button onClick={handleDepositeShow}>Deposit Now</Button>
          </Col>
        </Row>
      </Card>
      <Card className="my-3 p-3 rounded">
        <Row>
          <Col>
            <h5>{bonusAmt} INR</h5>
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
            <h5>{winningAmt} INR</h5>
            Winning Balance
          </Col>
          <Col style={{ alignContent: "center" }}>
            <Button onClick={handleWithdrawShow}>Withdraw Now</Button>
          </Col>
        </Row>
      </Card>
      <Modal
        show={showDepositeModal}
        onHide={handleDepositeClose}
        style={{ marginTop: "100px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deposite Now</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              Enter Deposite Amount:
              <Form.Control
                type="number"
                value={depositeAmt}
                onChange={(e) => setDepositeAmt(Number(e.target.value))}
              />
            </Form.Group>
            <Button style={{ width: "100%" }} onClick={depositeHandler}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showWithdrawModal} onHide={handleWithdrawClose}>
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
            Enter Withdraw Amount:
            <Form.Control
              type="number"
              value={withdrawAmt}
              onChange={(e) => setWithdrawAmt(Number(e.target.value))}
            />
            .<Form.Group></Form.Group>
            <Button style={{ width: "100%" }} onClick={withdrawHandler}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WalletScreen;
