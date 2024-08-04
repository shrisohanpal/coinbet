import { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";

const SpinningCoin = () => {
  

  var imgUrl = require("../assets/tails.png");

  return (
    <>
      <style>
        {`
          @keyframes spin { 
	          0% { 
		          transform: rotateY(0deg);
	          }  
            50%{
              transform: rotateY(180deg);
            }
	          100% { 
		          transform: rotateY(360deg);
            } 
          }
          .rotating-image {
            width: 70%;
            animation: spin 0.5s linear infinite;
          }

       `}
      </style>
      <Card.Img
        src={imgUrl}
        variant="top"
        className="rotating-image"
        style={{ alignSelf: "center" }}
      />
    </>
  );
};

export default SpinningCoin;
