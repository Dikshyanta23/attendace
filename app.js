const express = require("express");

require("express-async-errors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const cookieParser = require("cookie-parser");
const url = require("url");

//security
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

const connectDB = require("./db/connect");

//router import
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRoutes");
const studentRouter = require("./routes/studentRoutes");
const absenteesRouter = require("./routes/absenteesRoutes");
const paymentRouter = require("./routes/paymentRoutes");

//err middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.set("trust proxy", 1);
app.use(helmet());
// app.use(cors());
// app.use(xss());
app.use(mongoSanitize());
app.use(express.json());

app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/absentees", absenteesRouter);
app.use("/api/v1/payments", paymentRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
