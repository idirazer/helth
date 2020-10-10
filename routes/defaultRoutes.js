const express = require("express");
const router = express.Router();
const defaultControllerr = require("../controllers/defaultControllers");

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "default";

  next();
});
router.get("/", function (req, res) {
  res.render("default/index");
});

router.route("/").get(defaultControllerr.index);

router.route('/singup"').get(defaultControllerr.singinget);

module.exports = router;