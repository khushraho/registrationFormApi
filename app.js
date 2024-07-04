const express = require("express");
const errorMiddleware = require("./middleware/error.js");
const customError=require("./utills/CustomError.js")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path=require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan=require("morgan")
dotenv.config({ path: "config/config.env" });
const app = express();
app.use(morgan("tiny"))
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
const corsOptions = {
  origin: [
    "http://localhost:5173",
  ],
  credentials: true, 
  //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//route imports
const user = require("./routes/userRoute.js");


app.get("/", (req, res, next) => {
  res.send("i am professional");
});

app.use("/api/v1/user", user);



app.all("*", (req, res, next) => {
  const err = new customError(
    `can't find this(${req.originalUrl}) URL on server`,
    404
  );
  next(err);
});
app.use(errorMiddleware);
module.exports = app;