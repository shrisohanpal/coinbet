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
//import { toss } from "./controllers/coinController.js";
const port = process.env.PORT || 5000;

let status; //= "initial Value of Status";
let result; //= "initial value of Result";

//connectDB();
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
  cors: "http://localhost:3000",
});

let variableToWatch = 0;

io.on("connection", (socket) => {
  console.log("Socket is connected & id is: " + socket.id);
  socket.emit("variableChanged", { value: variableToWatch, status, result });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Function to update the variable and emit event if it changes
const updateVariable = (newValue, status, result) => {
  io.emit("variableChanged", { value: newValue, status, result });
};

const toss = () => {
  const randomVal = Math.random();
  const faceCoin = randomVal < 0.5 ? "HEAD" : "TAIL";
  const newValue = Math.floor(Math.random() * 100);
  updateVariable(newValue, "Points lagao moment has started!", result); // yahan pr result nahi dikhana
  setTimeout(() => {
    const newStatus2 = "Ab coin ghum raha hai!";
    updateVariable(newValue, "Ab coin ghum raha hai!", result); // yahan pr bhi nahi
    setTimeout(() => {
      updateVariable(
        newValue,
        "Ab result dikh raha hai aur next round ka wait kar rahe hai!",
        faceCoin
      ); // yahan pr dikhana hai bs
    }, 2000);
  }, 2000);
};

setInterval(() => {
  toss();
}, 6000);

httpServer.listen(port, () => console.log(`Server running on port ${port}`));
