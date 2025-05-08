const express = require("express");
const router = require("./src/routes");
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
app.use("/api/v1", router);

app.listen(3000, () => {
  console.log("App running on port 3000");
});

//API -application programming  interface
