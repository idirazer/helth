const User = require('../models/pharmacie');
//const { update } = require('../model/user');
//const { delete } = require('../routes');

insertUser = function (req, res, next) {
  const user = new User({
    userName: req.body.username,
    userMail: req.body.useremail
  });
  user.save((error, result) => {
    if (error) {
      console.log(error);
      res.redirect('/')
      return;
    }
    console.log(result)
    res.redirect('/getusers')
  })
}
getUser = function (req, res, next) {
  User.find({}, 'userName userMail', (error, result) => {
    if (error) {
      console.log(error)
      res.redirect('/')
    }
    console.log(result)
    res.render('index', {
      items: result
    })
  })
}
updateUser = function (req, res, next) {
  const email = req.body.email;
  const updatedUser = {
    password: req.body.password,
    pharmaciename: req.body.pharmaciename,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    numberf: req.body.numberf,
    wilaya: req.body.wilaya,
    city: req.body.city,
    adress: req.body.adress,
  }
  User.updateOne({
    email: email
  }, {
    $set: updatedUser
  }, (error, doc) => {
    if (error) {
      console.log(error);
      res.redirect('/');
      return;
    }
    console.log(doc);
    res.redirect('/setting')
  })
}

deleteUser = function (req, res, next) {
  const iD = req.body.id;
  User.deleteOne({
    _id: iD
  }, (error, doc) => {
    if (error) {
      console.log(error);
      req.redirect('/');
      return;
    }
    console.log(doc);
    res.redirect('/getusers')
  })
}
module.exports = {
  insertUser: insertUser,
  getUser: getUser,
  updatedUser: updateUser,
  deleteUser: deleteUser,
}