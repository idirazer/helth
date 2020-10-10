//configuration and use passport pakage
var passport = require("passport");
//configuration and use mongoose pakage
const mongoose = require("mongoose");
//configuration and use bcrypt pakage
const bcrypt = require("bcryptjs");
// Load User model
var UserH = require("../models/signup");



////////////////////////////////////////
const User = require('../models/user');
const Userb = require('../models/userb');

const UserD = require('../models/pharmacie');
const userD = require('../models/pharmacie');
////

const Cart = require('../models/cart');
//const cart = require('../model/cart');
const order = require('../models/order');
const product = require('../models/product');
const userb = require('../models/userb');
const user = require('../models/user');

var localStrategy = require("passport-local").Strategy;

////////////////////////////////////////
passport.serializeUser((user, done) => {
  return done(null, user.id);

})
passport.deserializeUser((id, done) => {
  User.findById(id, ('email userName  adress telphon image familyname '), (err, user) => {
    Cart.findById(id, (err, cart) => {
      if (!cart) {
        return done(err, user)
      }
      user.cart = cart;
      return done(err, user);
    })
  })
})

// passport.serializeUser((user , done)=>{
//      done(null , user.id);

//     })
passport.deserializeUser((id, done) => {
  Userb.findById(id, (err, user) => {
    done(err, user)
  })
})
////////////////// DON

passport.serializeUser((userD, done) => {
  return done(null, userD.id);

})
passport.deserializeUser((id, done) => {
  UserD.findById(id, ('email lastname'), (err, userD) => {
    return done(err, userD)
  })
})





















passport.use('local-signin', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, req.flash('signinError', 'this user not found'));

    }
    if (!user.comparePassword(password)) {
      return done(null, false, req.flash('signinError', 'wrong password'));
    }
    return done(null, user)
  })
}))
/*    fin local signin       */

/*    debut local signup      */

passport.use('local-signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  User.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (user) {
      return done(null, false, req.flash('signupError', 'this email already exsit'))
    }
    const newUser = new User({
      email: email,
      password: new User().hashPassword(password),
    })
    newUser.save((err, user) => {
      if (err) {
        return done(err)
      }
      return done(null, user);
    })
  })
}))
/*    fin local signup      */

/*debut local sign up fo publish medicines*/

passport.use('local-publishMedicines', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  Userb.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (user) {
      return done(null, false, req.flash('signupError', 'this email already exsit'))
    }
    const newUser = new Userb({
      email: req.body.email,
      name: req.body.name,
      // image : req.body.image ,
      //price : req.body.price ,
      adress: req.body.adress,
      TelephoneNumber: req.body.TelephoneNumber,
      password: new Userb().hashPassword(password),
      productName: req.body.productName,
      // utilisation : req.body.utilisation ,
      // Quantum : req.body.Quantum , 
      //price : req.body.price ,

    })
    newUser.save((err, user) => {
      if (err) {
        return done(err)
      }
      return done(null, user);

    })
  })

}))
/*fin local sign up fo publish medicines
      
       
      /*    debut local sign in of publish       */

passport.use('local-signinofpublish', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  Userb.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, req.flash('signinError', 'this user not found'));

    }
    if (!user.comparePassword(password)) {
      return done(null, false, req.flash('signinError', 'wrong password'));
    }
    return done(null, user)
  })
}))
/*    fin local sign in of publish       */


















/////////////////////////////////////////////////////////////////////////////////////DON
passport.use('local-signinD', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  UserD.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, req.flash('signinError', 'this user not found'));

    }
    if (!user.comparePassword(password)) {
      return done(null, false, req.flash('signinError', 'wrong password'));
    }
    return done(null, user)
  })
}))

passport.use('local-signupD', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',

  passReqToCallback: true
}, (req, email, password, done) => {
  UserD.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (user) {
      return done(null, false, req.flash('signupError', 'this email already exsit'))
    }
    const newUser = new UserD({
      email: req.body.email,
      password: new User().hashPassword(password),
      pharmaciename: req.body.pharmaciename,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      numberf: req.body.numberf,
      wilaya: req.body.wilaya,
      city: req.body.city,
      adress: req.body.adress,
    })
    newUser.save((err, user) => {
      if (err) {
        return done(err);
      }
      return done(null, user);
    })
  })
}))




passport.use('local-signinuD', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  UserD.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, req.flash('signinError', 'this user not found'));

    }
    if (!user.comparePassword(password)) {
      return done(null, false, req.flash('signinError', 'wrong password'));
    }
    return done(null, user)
  })
}))






















/////////////////////////////////////////



passport.serializeUser(function (userH, done) {
  done(null, userH.id);
});
passport.deserializeUser(function (id, done) {
  UserH.findById(id, function (err, userH) {
    done(err, userH);
  });
});
// creat local.signinH strategy
passport.use(
  "local.signinH",
  new localStrategy({
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      // check email
      req.checkBody("email", "invalid Email").isEmail();
      // check password
      req
        .checkBody("password", "Invalid password")

        .isLength({
          min: 5
        });
      var errors = req.validationErrors();
      if (errors) {
        var messages = [];
        errors.forEach(function (error) {
          messages.push(error.msg);
        });
        return done(null, false, req.flash("error", messages));
      }

      UserH.findOne({
        email: email
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "No User Found."
          });
        }
        // match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "password incrorrect"
            });
          }
        });
      });
    }
  )
);

// module.exports = function (passport) {
//   passport.use(
//     new localstrategy({ usernameField: "email" }, (email, password, done) => {
//       // march user
//       User.findOne({ email: email })
//         .then((user) => {
//           if (!user) {
//             return done(null, false, {
//               message: "That email is not registred",
//             });
//           }
//           // match password
//           bcrypt.compare(password, use.password, (err, isMatch) => {
//             if (err) throw err;
//             if (isMatch) {
//               return done(null, user);
//             } else {
//               return done(null, false, { message: "password incrorrect" });
//             }
//           });
//         })
//         .catch((err) => Console.log(err));
//     })
//   );
//   passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });
//   passport.deserializeUser(function (id, done) {
//     user.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });
// };

// passport.use(
//   "local.signup",
//   new localstrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     function (req, email, password, name, dateB, specialty, address, done) {
//       req.checkBody("email", "invalid Email").isEmail();
//       req
//         .checkBody("password", "Invalid password")

//         .isLength({ min: 5 });

//       var errors = req.validationErrors();
//       if (errors) {
//         var messages = [];
//         errors.forEach(function (error) {
//           messages.push(error.msg);
//         });
//         return done(null, false, req.flash("error", messages));
//       }
//       User.findOne({ email: email }, function (err, user) {
//         if (err) {
//           return done(err);
//         }
//         if (user) {
//           return done(null, false, { message: "Email is already use't." });
//         }
//         var newUser = new User();
//         newUser.email = email;
//         newUser.password = newUser.encryptPassword(password);
//         newUser.name = name;
//         newUser.dateB = dateB;
//         newUser.specialty = specialty;
//         newUser.address = address;
//         newUser.save(function (err, result) {
//           if (err) {
//             return done(err);
//           }
//           return done(null, newUser);
//         });
//       });
//     }
//   )
// );