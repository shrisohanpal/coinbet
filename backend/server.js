import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import coinRoutes from "./routes/coinRoutes.js";
import { addCoinbet, updateHistory } from "./controllers/coinbetController.js";
const port = process.env.PORT || 5000;

let status;
let result;
let history = [];

let headbetAmt = 0;
let tailbetAmt = 0;
let totalBets = [];

connectDB();
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser middleware
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/coin", coinRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any route that is not api will be redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

/*
toss(status,result);
const readg = () =>{
  toss(status,result)
}
setInterval(readg, 30 * 1000);*/
//app.listen(port, () => console.log(`Server running on port ${port}`));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  //cors: "http://localhost:3000",
  cors: "*",
});

let variableToWatch = 0;

io.on("connection", (socket) => {
  console.log("Socket is connected & id is: " + socket.id);
  socket.emit("variableChanged", { value: variableToWatch, status, result });

  socket.on("disconnect", () => {
    console.log("Client disconnected"); //fdfd
  });

  socket.on("betted", (data) => {
    totalBets.push({
      userId: data.userId,
      socketId: socket.id,
      side: data.side,
      amount: data.amount,
    });
    if (data.side == "HEAD") {
      headbetAmt += data.amount;
    } else {
      tailbetAmt += data.amount;
    }
    console.log("tail total: " + tailbetAmt);
    console.log("head total: " + headbetAmt);
  });
});

const updateVariable = (newValue, status, result) => {
  io.emit("variableChanged", { value: newValue, status, result, history });
};

const toss = () => {
  headbetAmt = 0;
  tailbetAmt = 0;
  totalBets = [];
  const newValue = Math.floor(Math.random() * 100);
  updateVariable(newValue, "Betting", result, history);

  setTimeout(() => {
    // It will run after 10 seconds
    updateVariable(newValue, "Spinning", result, history);

    const faceCoin =
      headbetAmt == 0 || tailbetAmt == 0 || headbetAmt == tailbetAmt
        ? Math.random() > 0.5
          ? "HEAD"
          : "TAIL"
        : headbetAmt > tailbetAmt
        ? "TAIL"
        : "HAID";

    setTimeout(() => {
      // It will run after 10 seconds
      addCoinbet(45, 78, faceCoin);
      updateHistory(history);
      updateVariable(newValue, "Showing", faceCoin, history);
    }, 10 * 1000);
  }, 10 * 1000);
};

setInterval(() => {
  toss();
}, 30 * 1000);

httpServer.listen(port, () => console.log(`Server running on port ${port}`));
