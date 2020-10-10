var express = require('express');

var router = express.Router();
const {
  check,
  validationResult,
  Result
} = require('express-validator6');

const User = require('../models/user')
const Userb = require('../models/userb')
const Order = require('../models/order');
const passport = require('passport');
const user = require('../models/user');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname)
  }
})

const upload = multer({
  storage: storage
})
router.use(upload.single('myfile'));

/* GET users listing. */
/*   _______debut code source signup _________ */

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "layout";
  next();
});


router.get('/signup', isNotSignin, function (req, res, next) {
  var massageError = req.flash('signupError')
  res.render('user/signup', {
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
  console.log(errors.errors.length + "idiidididdddddddddddddddddddi8988")
  if (!errors.isEmpty()) {
    console.log(errors.errors.length + "idiidididdddddddddddddddddddi8988")
    var validationMassages = [];
    for (var i = 0; i < errors.errors.length; i++) {
      validationMassages.push(errors.errors[i].msg)
    }
    console.log(validationMassages + "opopooppopoopoopoopopop");

    req.flash('signupError', validationMassages);
    res.redirect('signup')
    return;
  }
  next();

}, passport.authenticate('local-signup', {
  session: false,
  successRedirect: 'signin',
  failureRedirect: 'signup',
  failureMessage: true
}))

/*   _______ fin code source signup _________ */


/*   _______debut code source puplish _________ */

router.get('/publishMedicines', isNotSignin, function (req, res, next) {
  var massageError = req.flash('signupError')
  res.render('user/publishMedicines', {
    masseges: massageError
  });
});

router.post('/publishMedicines', [
  check('name').not().isEmpty().withMessage(' please enter your name and famiylName'),

  check('adress').not().isEmpty().withMessage(' please enter your adress'),
  check('TelephoneNumber').not().isEmpty().withMessage(' please enter your TelephoneNumber'),
  check('TelephoneNumber').isLength({
    min: 5
  }).withMessage('TelephoneNumber equals 10 number'),
  check('email').not().isEmpty().withMessage(' please enter your email'),
  check('email').isEmail().withMessage('please enter valid email'),
  check('productName').not().isEmpty().withMessage(' please enter your productName'),
  //  check('utilisation').not().isEmpty().withMessage(' please enter your utilisation'),
  //check('price').not().isEmpty().withMessage(' please enter your price'),
  check('password').not().not().isEmpty().withMessage('please enter your password'),
  check('password').isLength({
    min: 5
  }).withMessage('please enter password more than 5 char'),
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

    res.redirect('publishMedicines',
      // {email:req.body.email}
    )

    return;
  }
  next();


}, passport.authenticate('local-publishMedicines', {
  session: false,
  successRedirect: 'signinofpublish',
  failureRedirect: 'publishMedicines',
  failureMessage: true
}))

/*   _______FIN code source puplish _________ */


/*   _______ debut code source signin of puplishmedicines   signinofpublish _________ */
router.get('/signinofpublish', isNotSignin, (req, res, next) => {
  var massageError = req.flash('signinError');
  res.render('user/signinofpublish', {
    masseges: massageError
  })
})
router.post('/signinofpublish', [
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
    res.redirect('signinofpublish')
    return;
  }
  next();

}, passport.authenticate('local-signinofpublish', {
  successRedirect: 'profileVendor',
  failureRedirect: 'signinofpublish ',
  failureFlash: true,
}))

/* ________fin code source of signin of publish */

/*   _______debut code source Medication Registration Form*/


/*

  
  
} ,passport.authenticate('local-MedicationRegistrationForm' , {
  session : false ,
  successRedirect : '' , 
    failureRedirect : 'MedicationRegistrationForm' ,
    failureMessage : true
})) 

    debut code source Medication Registration Form _________ */



router.post('/MedicationRegistrationForm', [
  check('productName').not().isEmpty().withMessage(' please enter your medicament name'),
  check('utilisation').not().isEmpty().withMessage(' please enter your medicament utilisation'),
  check('quantite').not().isEmpty().withMessage(' please enter your medicament quantite'),
  check('Advice').not().isEmpty().withMessage(' please enter your Advice '),
  check('price').not().isEmpty().withMessage(' please enter your medicament price'),

], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    var validationMassages = [];
    for (var i = 0; i < errors.errors.length; i++) {
      validationMassages.push(errors.errors[i].msg)
    }


    req.flash('profileError', validationMassages);

    res.redirect('MedicationRegistrationForm')
    return;

  }
  next();


})

/*        هذا هو المشكله لوجدتو */
router.get('/profileVendor', (req, res, next) => {
  console.log(req.isAuthenticated())
  console.log(req.user)
  console.log(req.logOut())
  // console.log(req.session)
  // console.log(req.user)
  console.log(req.isAuthenticated())
  console.log(req.user)

  /*var massageError = req.flash('profileError')
  var hasMassageError = false ;
  if(massageError.length > 0){
    hasMassageError = true ;
  }
  */
  res.render('user/profileVendor', {
      //masseges :massageError ,
      // hasMassageError :hasMassageError,

    }

  )
})





/*   _______ debut code source profile _________ */

router.get('/profile', isSignin, (req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  if (req.user.cart) {
    totalProducts = req.user.cart.totalquantity
  } else {
    totalProducts = 0
  }
  Order.find({
    user: req.user._id
  }, (err, resualt) => {
    if (err) {
      console.log(err)
    }
    console.log(resualt)
    var massageError = req.flash('profileError')
    var hasMassageError = false;
    if (massageError.length > 0) {
      hasMassageError = true;
    }
    res.render('user/profile', {
      chekuse: true,
      checkProfile: true,
      totalProducts: totalProducts,
      userOrder: resualt,
      masseges: massageError,
      hasMassageError: hasMassageError,
      user: req.user,
    })
  })

})

/*   _______ fin code source profile _________ */
router.get('/thankyou', (req, res, next) => {

  res.render('thankyou')
})

router.get('/about', (req, res, next) => {

  res.render('about')
})

router.get('/shop', (req, res, next) => {

  res.render('shop')
})


router.get('/contact', (req, res, next) => {
  var massageError = req.flash('signupError')
  res.render('contact', {
    masseges: massageError
  })
})

router.post('/contact', [
  check('name').not().isEmpty().withMessage(' please enter your name'),
  check('FamilyName').not().isEmpty().withMessage(' please enter your FamilyName'),
  check('email').not().isEmpty().withMessage(' please enter your email'),
  check('subject').not().isEmpty().withMessage(' please enter your subject'),
  check('message').not().isEmpty().withMessage(' please enter your message'),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    var validationMassages = [];
    for (var i = 0; i < errors.errors.length; i++) {
      validationMassages.push(errors.errors[i].msg)
    }


    req.flash('signupError', validationMassages);
    res.redirect('contact')
    return;
  }
  next();




  res.redirect('/')
})


/*   _______ debut code source signin _________ */

router.get('/signin', isNotSignin, (req, res, next) => {
  var massageError = req.flash('signinError');
  res.render('user/signin', {
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

}, passport.authenticate('local-signin', {
  successRedirect: 'profile',
  failureRedirect: 'signin',
  failureFlash: true,
}))

/*   _______ fin code source signin_________ */

/*   _______ debut code source updateuser _________ */
router.post('/updateuser', [

  check('username').not().isEmpty().withMessage(' please enter your username'),
  check('familyname').not().isEmpty().withMessage(' please enter your familyname'),
  check('adress').not().isEmpty().withMessage(' please enter your adress'),
  check('telphon').not().isEmpty().withMessage(' please enter your telephone number'),
  check('email').not().isEmpty().withMessage(' please enter your email'),
  check('email').isEmail().withMessage('please enter valid email'),
  check('password').not().not().isEmpty().withMessage('please enter your password'),
  check('password').isLength({
    min: 5
  }).withMessage('please enter password more than 5 char'),
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


    req.flash('profileError', validationMassages);

    console.log(validationMassages)
    res.redirect('profile')
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
            res.redirect('profile')

          }
        }
      }
    })

  }

})


router.post('/uploadfile', (req, res, next) => {
  console.log((req.file.path).slice(6));
  const newUser = {
    image: (req.file.path).slice(6)
  }
  user.updateOne({
    _id: req.user._id
  }, {
    $set: newUser
  }, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      console.log(doc)
      res.redirect('profile')
    }
  })

})

/*   _______ fin code source updateuser _________ */

router.post('/uploadfileV', (req, res, next) => {
  console.log((req.file.path).slice(6));
  const newUser = {
    image: (req.file.path).slice(6)
  }
  Userb.updateOne({
    email: req.Userb.email
  }, {
    $set: newUser
  }, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      console.log(doc)
      res.redirect('publishMedicines')
    }
  })

})

/*
            router.post('/updateuserV'  , [
            
              check('name').not().isEmpty().withMessage(' please enter your username'),
              check('adress').not().isEmpty().withMessage(' please enter your adress'),
              check('TelephoneNumber').not().isEmpty().withMessage(' please enter your telephone number'),
              check('email').not().isEmpty().withMessage(' please enter your email'),
              check('email').isEmail().withMessage('please enter valid email'),
              check('password').not().not().isEmpty().withMessage('please enter your password'),
              check('password').isLength({ min: 5 }).withMessage('please enter password more than 5 char'),
              check('confirm-password').custom((value, { req }) => {
                if (value !== req.body.password) {
                  throw new Error('password and confirm not matched')
            
                }
                return true;
              })
            ] , (req , res ,next)=>{
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                
                var validationMassages = [];
                for(var i =0 ; i<errors.errors.length ; i++){
                  validationMassages.push(errors.errors[i].msg)
                }
                
            
                req.flash('profileError' , validationMassages);
                
                console.log(validationMassages)
                res.redirect('profileVendor')
                return;
              }else{
                console.log('user update')
                const updatedUser = {
                  name : req.body.name ,
                  TelephoneNumber :req.body.TelephoneNumber ,
                 email: req.body.email ,
                  adress : req.body.adress,
                  password : new user().hashPassword(req.body.password)
                }
                user.updateOne({_id : req.user._id} , {$set : updatedUser} ,(er , doc)=>{
                  if(er){
                    console.log(er)
                  }else{
                    console.log(doc);
                    res.redirect('profileVendor')
                  }
                })
                
              }
            
              })


      /*   _______ debut code source logout _________ */
router.get('/logout', isSignin, (req, res, next) => {
  req.logOut();
  res.redirect('/')
})


function isSignin(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('signin')
    return;
  }
  next();
}
/*   _______ fin code source logout _________ */
/*
function isSignin(req , res , next){
  if(! req.isAuthenticated()){
    res.redirect('signinofpublish')
   return ;
  }
  next();
}*/
function isNotSignin(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/')
    return;
  }
  next();
}

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