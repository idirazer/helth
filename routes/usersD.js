var express = require('express');
var router = express.Router();
const {
  check,
  validationResult,
  Result
} = require('express-validator6');
const User = require('../models/pharmacie')
const product = require('../models/medicament');
const control = require('../controler/user_conroler');
const passport = require('passport');



/////////////////////////////////////////////////
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "layoutD";
  next();
});

/* GET users listing. */
router.get('/signup', isNotSignin, function (req, res, next) {
  var massageError = req.flash('signupError')
  res.render('p/user/signup', {
    masseges: massageError
  });
});

router.post('/signup', [
  check('email').not().isEmpty().withMessage(' please enter your email'),
  check('email').isEmail().withMessage('please enter valid email'),
  check('password').not().not().isEmpty().withMessage('please enter your password'),
  check('password').isLength({
    min: 5
  }).withMessage('please enter password more than 5 char'),
  check('numberf').isLength({
    min: 10
  }).withMessage('please enter your correct phone'),
  check('firstname').not().isEmpty().withMessage(' please enter your first name'),
  check('lastname').not().isEmpty().withMessage(' please enter your last name'),
  check('wilaya').not().isEmpty().withMessage(' please enter your wilaya'),
  check('city').not().isEmpty().withMessage(' please enter your city'),
  check('adress').not().isEmpty().withMessage(' please enter your adress'),
  check('pharmaciename').not().isEmpty().withMessage(' please enter your Pharmacie name'),
  check('confirm-password').custom((value, {
    req
  }) => {
    if (value !== req.body.password) {
      throw new Error('password and confirm not matched')

    }
    return true;
  })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    var validationMassages = [];
    for (var i = 0; i < errors.errors.length; i++) {
      validationMassages.push(errors.errors[i].msg)
    }


    req.flash('signupError', validationMassages);
    res.redirect('signup')
    return;
  }
  next();

}, passport.authenticate('local-signupD', {
  session: false,
  successRedirect: 'signin',
  failureRedirect: 'signup',
  failureMessage: true
}))


router.get('/profile', isSignin, (req, res, next) => {
  product.find({}, (error, doc) => {
    if (error) {
      console.log(error)
    }
    var productGrid = [];

    var colGrid = 3;
    for (var i = 0; i < 6; i += colGrid) {
      productGrid.push(doc.slice(i, i + colGrid))


    }
    console.log(productGrid)


    res.render('p/user/profile', {
      products: productGrid,
      checkProfile: true,
      chekuse: true,
      user: req.user
    });



  })

})
/*dounia routes*/
router.get('/message', isSignin, (req, res, next) => {

  res.render('user/message', {
    chekuse: true,
    checkProfile: true
  })
})


router.get('/medecines', isSignin, function (req, res, next) {

  product.find({}, (error, doc) => {
    if (error) {
      console.log(error)
    }
    var productGrid = [];

    var colGrid = 3;
    for (var i = 0; i < doc.length; i += colGrid) {
      productGrid.push(doc.slice(i, i + colGrid))


    }
    console.log(productGrid)


    res.render('medecines', {
      products: productGrid,
      checkProfile: true,
      chekuse: true
    });



  })

});
router.get('/setting', isSignin, (req, res, next) => {

  res.render('user/setting', {
    chekuse: true,
    checkProfile: true
  })
})
router.get('/readmess', isSignin, (req, res, next) => {

  res.render('user/readmess', {
    chekuse: true,
    checkProfile: true
  })
})
router.get('/about', isSignin, (req, res, next) => {

  res.render('p/user/about', {
    chekuse: true,
    checkProfile: true
  })
})
/*end dounia routes*/



router.get('/signin', isNotSignin, (req, res, next) => {
  var massageError = req.flash('signinError');
  res.render('p/user/signin', {
    masseges: massageError
  })
})
router.post('/signin', [
  check('email').not().isEmpty().withMessage(' please enter your email'),
  check('email').isEmail().withMessage('please enter valid email'),
  check('password').not().not().isEmpty().withMessage('please enter your password'),
  check('password').isLength({
    min: 5
  }).withMessage('please enter password more than 5 char'),


], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    var validationMassages = [];
    for (var i = 0; i < errors.errors.length; i++) {
      validationMassages.push(errors.errors[i].msg)
    }


    req.flash('signinError', validationMassages);
    res.redirect('signin')
    return;
  }
  next();

}, passport.authenticate('local-signinD', {
  successRedirect: 'profile',
  failureRedirect: 'signin',
  failureFlash: true,
}))

router.get('/logout', isSignin, (req, res, next) => {
  req.logOut();
  res.redirect('/')
})
router.get('/logoutp', isSignin, (req, res, next) => {
  req.logOut();
  res.redirect('index')
})

function isSignin(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('signin')
    return;
  }
  next();
}

function isNotSignin(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/')
    return;
  }
  next();
}



router.post('/updateuser', [

  check('firstname').not().isEmpty().withMessage(' please enter your username'),
  check('lastname').not().isEmpty().withMessage(' please enter your familyname'),
  check('adress').not().isEmpty().withMessage(' please enter your adress'),
  check('wilaya').not().isEmpty().withMessage(' please enter your wilaya'),
  check('city').not().isEmpty().withMessage(' please enter your city'),
  check('numberf').not().isEmpty().withMessage(' please enter your telephone number'),
  check('email').not().isEmpty().withMessage(' please enter your email'),
  check('email').isEmail().withMessage('please enter valid email'),
  check('password').not().not().isEmpty().withMessage('please enter your password'),
  check('password').isLength({
    min: 5
  }).withMessage('please enter password more than 5 char'),
  check('confirm_password').custom((value, {
    req
  }) => {
    if (value !== req.body.password) {
      throw new Error('password and confirm not matched')

    }
    return true;
  })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    var validationMassages = [];
    for (var i = 0; i < errors.errors.length; i++) {
      validationMassages.push(errors.errors[i].msg)
    }


    req.flash('profileError', validationMassages);

    console.log(validationMassages)
    res.redirect('setting')
    return;
  } else {
    user.find({
      email: req.body.email
    }, (err, doc) => {
      if (err) {
        console.log(err)

      } else {
        if (doc.length <= 0) {
          updateduser(req, res);
          return;
        } else {
          if ((doc[0]._id).toString() === (req.user._id).toString()) {
            updateduser(req, res);
            return;
          } else {
            req.flash('profileError', ['this email already used']);
            res.redirect('setting')

          }
        }
      }
    })

  }

})

function updateduser(req, res) {
  console.log('user update')
  const updatedUser = {
    userName: req.body.username,
    telphon: req.body.telphon,
    familyname: req.body.familyname,
    email: req.body.email,
    adress: req.body.adress,
    password: new user().hashPassword(req.body.password)
  }
  user.updateOne({
    _id: req.user._id
  }, {
    $set: updatedUser
  }, (error, doc) => {
    if (error) {
      console.log(error)
    } else {
      console.log(doc);
      req.logOut();
      res.redirect('signin')
    }
  })
}









module.exports = router;