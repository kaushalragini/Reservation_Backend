const express = require("express");
const app = express();
// const { connection } = require("./config/db");
const { trainRouter } = require("./routes/trains.routes");
const bodyParser = require("body-parser");
const cors = require("cors");
// const {validation} = require("./middleware/validation.middleware");

// Middleware
app.use(bodyParser.json());
// app.use(validation);
app.use(cors());
app.use("/train", trainRouter);
//process.env.PORT
app.listen(8080, () => {
  console.log(`Server is connected to 8080`);
});
