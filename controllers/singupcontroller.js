const Postup = require("../models/singupPost").postup;

module.exports = {
  index: (req, res) => {
    res.render("singup/index");
  },
  singupget: (req, res) => {
    res.render("singup/index");
  },
  singuppost: (req, res) => {
    const newUser = new postup({
      name: req.body.signonname,
      username: req.body.username,
      email: req.body.email,
      passwod: req.body.signonpassword,
      dateB: req.body.birthday,
      specialty: req.body.specialty,
      address: req.body.address,
    });
    res.send("sahit pour ansqri");
  },
};
