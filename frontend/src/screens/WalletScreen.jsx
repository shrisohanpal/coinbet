import { Card, Row, Col, Button, Image } from "react-bootstrap";
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

  var result = 'Heads or Tails';
  const tossCoin =() => {
    console.log('sfd');
    result = 'Tails';
  }

  return (
    <>
      <Card className="p-3 rounded">
       <h5>Bhosdike abhi bana hai na Game. Tujhe withdraw karne ki jaldi hai 😆</h5>
       <h6>thoda sabar rakh. bana raha hu abhi</h6>
      </Card>
    </>
  );
};

export default WalletScreen;
