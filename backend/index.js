require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require ('./routes/AuthRouter')
const ProductRouter = require ('./routes/ProductRouter')

require("./models/db");
   
const PORT = process.env.PORT || 8080;


console.log("chGAGAG")
app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth",AuthRouter);
app.use("/products",ProductRouter);


app.listen(PORT, () => {
  console.log(`app is running on ${PORT} `);
});
