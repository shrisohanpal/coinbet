import { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";

const SpinningCoin = ({ status, result }) => {
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
            animation: spin 0.5s linear infinite;
          }
       `}
      </style>
      <Card.Img
        src={
          result == "HEAD"
            ? require("../assets/heads.png")
            : require("../assets/tails.png")
        }
        variant="top"
        className={status == "Spinning" ? "rotating-image" : ""}
        style={{ alignSelf: "center", width: "70%" }}
      />
    </>
  );
};

export default SpinningCoin;
