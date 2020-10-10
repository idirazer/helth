var express = require('express');
var router = express.Router();
const {
  check,
  validationResult,
  Result
} = require('express-validator6');
const product = require('../models/medicament');
const User = require('../models/pharmacie');
const Message = require('../models/message');
//const cart = require('../model/cart');
//const { Result } = require('express-validator');
//const { check, validationResult, Result } = require('express-validator');
const passport = require('passport');
/////////////////////////////////
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "layoutD";
  next();
});

//const e = require('express');


/* GET home page. */
/*
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeG' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
router.all("/*", (req, res, next) => {

  next();
});


router.post("/image/:id", upload.single('image'), function (req, res, next) {
  var pharmacieId = req.params.id;
  var pharmacieIdd = pharmacieId.toString();
  var id = mongoose.Types.ObjectId(pharmacieIdd);
  console.log(id);
  var path1 = req.file.path
  var path2 = path1.slice(14)
  var path = ("/upload/" + path2)
  Message.findOne({email : email} , (err , user)=>{
    if (err){
        return done(err)
    }
    if(Message){
        return done(null , false , req.flash('signupError' ,'this email already exsit' ))
    }
    const newMessage = new Message(id,{
        imagepathe: path,
        email : req.body.email , 
        password :new User().hashPassword(password),
        name : req.body.name ,
        messmessage : req.body.messmessage,
        wilaya : req.body.wilaya,
        city : req.body.city, 
        adress : req.body.adress,
    })
    newMesssage.save((err , user)=>{
        if(err){
            return done(err);
        }
        return done( null ,user);
    })
})
  doctors_list.findByIdAndUpdate(
    id, {
      imagepathe: path
    },
    function (err, docs) {
      console.log(docs)
      res.render("shop-single", {
        user: docs
      });
    }
  )
})


*/



router.get('/', function (req, res, next) {

  User.find({}, (error, doc) => {
    if (error) {
      console.log(error)
    }
    var productGrid = [];

    var colGrid = 3;
    for (var i = 0; i < 6; i += colGrid) {
      productGrid.push(doc.slice(i, i + colGrid))


    }
    console.log(productGrid)


    res.render('p/index', {
      title: 'Health care',
      users: productGrid,
      chekuse: req.isAuthenticated()
    });

  })


});
router.get('/demande', (req, res, next) => {

  res.render('p/demande')
})
router.get('/contact', (req, res, next) => {

  res.render('p/contact')
})
router.get('/about', (req, res, next) => {

  res.render('p/about')
})
router.get('/cart', (req, res, next) => {

  res.render('p/cart')
})
router.get('/shop', function (req, res, next) {
  User.find({}, (error, doc) => {
    if (error) {
      console.log(error)
    }
    var productGrid = [];

    var colGrid = 3;
    for (var i = 0; i < doc.length; i += colGrid) {
      productGrid.push(doc.slice(i, i + colGrid))


    }
    console.log(productGrid)


    res.render('p/shop', {
      title: 'Health care',
      users: productGrid,
      chekuse: req.isAuthenticated()
    });

  })
  /*const successMas = req.flash('success')[0];
  product.find({}, (error , doc)=>{
    if(error){
      console.log(error)
    }
    var productGrid = [] ;

    var colGrid = 3 ; 
       for(var i = 0 ; i<doc.length ; i+=colGrid){
         productGrid.push(doc.slice(i , i+colGrid))
        
         
       }
       console.log(productGrid)
       

       res.render('shop', { title: 'Health care', products : productGrid ,
       successMas :successMas , chekuse : req.isAuthenticated()});

    

  })*/


});

router.get('/shop-single/:id/:firstname/:lastname/:pharmaciename/:city/:wilaya/:adress/:numberf', (req, res, next) => {
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


    res.render('p/shop-single', {
      products: productGrid,
      firstname: req.params.firstname,
      lastname: req.params.lastname,
      pharmaciename: req.params.pharmaciename,
      city: req.params.city,
      wilaya: req.params.wilaya,
      adress: req.params.adress,
      numberf: req.params.numberf
    });
  })
})

router.get('/thankyou', (req, res, next) => {

  res.render('p/thankyou')
})
router.get('/chekout', (req, res, next) => {

  res.render('p/chekout')
})
router.get('/pharmacies', (req, res, next) => {

  User.find({}, (error, doc) => {
    if (error) {
      console.log(error)
    }
    var productGrid = [];

    var colGrid = 3;
    for (var i = 0; i < doc.length; i += colGrid) {
      productGrid.push(doc.slice(i, i + colGrid))


    }
    console.log(productGrid)


    res.render('p/Pharmacies', {
      title: 'Health care',
      users: productGrid,
      chekuse: req.isAuthenticated()
    });



  })
})


router.get('/singlephar/:id/:firstname/:lastname/:adress/:city/wilaya/:email/:numberf', (req, res, next) => {
  const sessionid = req.user._id;

})

router.get('/addTocart/:id/:price/:name', (req, res, next) => {



  const cartID = req.user._id;
  const newproductPrice = parseInt(req.params.price, 10)
  const newProduct = {
    _id: req.params.id,
    price: newproductPrice,
    name: req.params.name,
    quantity: 1,

  }
  Cart.findById(cartID, (err, cart) => {
    if (err) {
      console.log(err)

    }
    if (!cart) {
      const newCart = new Cart({
        _id: cartID,
        totalquantity: 1,
        totalprice: newproductPrice,
        selectedProduct: [newProduct],
        createAt: Date.now(),

      })

      newCart.save((err, doc) => {
        if (err) {
          console.log(err)
        }
        console.log(doc)
      })

    }
    if (cart) {
      var indexOfProduct = -1;
      for (var i = 0; i < cart.selectedProduct.length; i++) {
        if (req.params.id === cart.selectedProduct[i]._id) {
          indexOfProduct = i;
          break;
        }

      }
      if (indexOfProduct >= 0) {
        cart.selectedProduct[indexOfProduct].quantity = cart.selectedProduct[indexOfProduct].quantity + 1;
        cart.selectedProduct[indexOfProduct].price = cart.selectedProduct[indexOfProduct].price + newproductPrice;
        cart.totalquantity = cart.totalquantity + 1;
        cart.totalprice = cart.totalprice + newproductPrice;
        cart.createAt = Date.now();
        Cart.updateOne({
          _id: cartID
        }, {
          $set: cart
        }, (err, doc) => {
          if (err) {
            console.log(err)
          }
          console.log(doc)
          console.log(cart)
        })
      } else {
        cart.totalquantity = cart.totalquantity + 1;
        cart.totalprice = cart.totalprice + newproductPrice;
        cart.selectedProduct.push(newProduct)
        cart.createAt = Date.now();
        Cart.updateOne({
          _id: cartID
        }, {
          $set: cart
        }, (err, doc) => {
          if (err) {
            console.log(err)
          }
          console.log(doc)
          console.log(cart)
        })
      }
    }
  })

  res.redirect('/')
})








function isSignin(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('signinu')
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

router.get('/signinu', isNotSignin, (req, res, next) => {
  var massageError = req.flash('signinError');
  res.render('signinu', {
    masseges: massageError
  })
})
router.post('/signinu', [
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
    res.redirect('signinu')
    return;
  }
  next();

}, passport.authenticate('local-signin', {
  successRedirect: 'shop-single',
  failureRedirect: 'shop-single',
  failureFlash: true,
}))
module.exports = router;
/*
[ {} {} {} {} {} {} ]
*/