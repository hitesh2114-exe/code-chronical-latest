const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const mainRouter = require("./routes/mainRoutes");

const app = express();
const port = 8080;

connectDB();

app.use(express.json());
app.use(mainRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Connected to port : ${port}`);
});
