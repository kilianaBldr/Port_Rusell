const express = require("express");
const router = express.Router();

const userRouter = require("./users");
const dashboardRouter = require("./dashboard")
const catwaysRouter = require("./catways");
const reservationRouter = require("./reservations");

const private = require("../middlewares/private");

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index");
});

router.use("/dashboard", dashboardRouter);
router.use("/users", userRouter);
router.use("/catways",private.checkJWT, catwaysRouter);
router.use("/reservation", private.checkJWT, reservationRouter);


module.exports = router;

