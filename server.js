const express = require("express");
const router = require("./routes");
const cors = require("cors");

const app = express(); // create express app
//-router
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // if you're using cookies/auth
  })
);

//middleware
app.use(express.json());
app.use(express.static("public"));
app.use(router);

app.listen(3000, () => {
  console.log("App running on port 3000");
});
