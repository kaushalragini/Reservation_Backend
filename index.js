const express = require("express");
const app = express();

const { trainRouter } = require("./routes/trains.routes");
const bodyParser = require("body-parser");
const cors = require("cors");


// Middleware
app.use(bodyParser.json());

app.use(cors());
app.use("/train", trainRouter);

app.listen(8080, () => {
  console.log(`Server is connected to 8080`);
});
