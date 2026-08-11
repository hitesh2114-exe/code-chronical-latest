const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const mainRouter = require("./routes/mainRoutes");
const cors = require("cors");

const app = express();
const port = 8080;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(mainRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Connected to port : ${port}`);
});
