require("module-alias/register");
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const router = require("./src/routes/api");
const cors = require("cors");
const handleNotFound = require("@/middleware/handleNotFound");
const handleError = require("@/middleware/handleError");
const handlePagination = require("@/middleware/handlePagination");
const responseEnhancer = require("@/middleware/responseEnhancer");
const adminRoute = require("@/routes/admin");
const handleSidebar = require("@/middleware/admin/handleAdminSidebar");
const methodOverride = require("method-override");
const handleSession = require("@/middleware/admin/handleSession");
const cookieParser = require("cookie-parser");
const shareLocals = require("@/middleware/admin/shareLocals");
const checkAuth = require("@/middleware/admin/checkAuth");
const app = express(); // create express app
//-router
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // if you're using cookies/auth
  })
);

//middleware
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(handlePagination);
app.use(responseEnhancer);
//Views
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set("layout", "admin/layouts/default");

//router
app.use("/api/v1", router);
app.use("/admin", handleSession, shareLocals, checkAuth, handleSidebar);
app.use("/admin", adminRoute);

app.use(handleNotFound);
app.use(handleError);

app.listen(3000, () => {
  console.log("App running on port 3000");
});

//API -application programming  interface
