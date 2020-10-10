var express = require('express');
var router = express.Router();
const product = require('../models/product');
const Cart = require('../models/cart');
const cart = require('../models/cart');
const Order = require('../models/order');
const Userb = require('../models/userb');

//const { Result } = require('express-validator');
const {
  check,
  validationResult,
  Result
} = require('express-validator6');
const passport = require('passport');

//const e = require('express');

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "layout";
  next();
});
/* GET home page. */

router.get('/', function (req, res, next) {
  const successMas = req.flash('success')[0];
  var totalProducts = null;
  if (req.isAuthenticated()) {
    if (req.user.cart) {
      totalProducts = req.user.cart.totalquantity;
    } else {
      totalProducts = 0;
    }


  }
  product.find({}, (error, doc) => {
    if (error) {
      console.log(error)
    }
    var productGrid = [];

    var colGrid = 3;
    for (var i = 0; i < 6; i += colGrid) {
      productGrid.push(doc.slice(i, i + colGrid))

    }


    res.render('index', {
      title: 'particular',
      products: productGrid,
      chekuse: req.isAuthenticated(),
      totalProducts: totalProducts,
      successMas: successMas,
    });



  })

});
/* _____  debut ajoute medicines ___*/

router.get('/addTocart/:id/:price/:name', (req, res, next) => {

  req.session.hasCart = true;
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

  res.redirect('/shop')
})
/*___________fin de ajoute medcines*/
/* _____ debut medicines  ____*/

router.get('/Medicines', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/users/signin');
    return;
  }
  console.log(req.session.hasCart)
  if (!req.user.cart) {
    res.render('Medicines', {
      chekuse: true,
      hasCart: req.session.hasCart,
      totalProducts: 0
    });
    req.session.hasCart = false;
    return;
  }
  const userCart = req.user.cart;
  const totalProducts = req.user.cart.totalquantity;
  res.render('Medicines', {
    userCart: userCart,
    chekuse: true,
    totalProducts: totalProducts
  });
})
router.get('/deleteMedicines/:index', (req, res, next) => {
  if (req.user.cart) {

    const index = req.params.index;

    const userCart = req.user.cart;
    console.log(userCart.selectedProduct.length);
    if (userCart.selectedProduct.length <= 1) {
      cart.deleteOne({
        _id: userCart._id
      }, (err, doc) => {
        if (err) {
          console.log(err)
        }
        console.log(doc)
        res.redirect('/Medicines')
      })
    } else {
      userCart.totalprice = userCart.totalprice - userCart.selectedProduct[index].price;
      userCart.totalquantity = userCart.totalquantity - userCart.selectedProduct[index].quantity;

      userCart.selectedProduct.splice(index, 1);
      userCart.createAt = Date.now();
      cart.updateOne({
        _id: userCart._id
      }, {
        $set: userCart
      }, (err, doc) => {
        if (err) {
          console.log(err)
        }
        console.log(doc)
        res.redirect('/Medicines')
      })

    }
  } else {
    res.redirect('/Medicines')
  }


})
/*_______fin medcines ___*/
/* __________debut checkout________*/

router.get('/checkout', (req, res, next) => {
  if (req.user.cart) {
    console.log(req.user)
    var massageError = req.flash('signupError')
    if (req.user.userName === undefined || req.user.adress === undefined || req.user.telphon === undefined) {
      req.flash('profileError', ['please update your information before do order']);
      res.redirect('users/profile')
      return;
    }
    res.render('checkout', {
      chekuse: true,
      totalProducts: req.user.cart.totalquantity,
      totalprice: req.user.cart.totalprice,
      masseges: massageError,
      user: req.user,
    })
  } else {
    res.redirect('/Medicines')
  }

})

router.get('/thankyou', (req, res, next) => {

  res.render('thankyou')
})
router.get('/about', (req, res, next) => {

  res.render('about')
})
router.get('/contact', (req, res, next) => {
  var massageError = req.flash('signupError')
  res.render('contact', {
    masseges: massageError
  })
})

// router.post('/contact', [
//   check('name').not().isEmpty().withMessage(' please enter your name'),
//   check('FamilyName').not().isEmpty().withMessage(' please enter your FamilyName'),
//   check('email').not().isEmpty().withMessage(' please enter your email'),
//   check('subject').not().isEmpty().withMessage(' please enter your subject'),
//   check('message').not().isEmpty().withMessage(' please enter your message'),
// ], (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {

//     var validationMassages = [];
//     for (var i = 0; i < errors.errors.length; i++) {
//       validationMassages.push(errors.errors[i].msg)
//     }


//     req.flash('signupError', validationMassages);
//     res.redirect('contact')
//     return;
//   }
//   next();




//   res.redirect('/')
// })



router.get('/shop', (req, res, next) => {
  const successMas = req.flash('success')[0];
  var totalProducts = null;
  if (req.isAuthenticated()) {
    if (req.user.cart) {
      totalProducts = req.user.cart.totalquantity;
    } else {
      totalProducts = 0;
    }


  }

  product.find({}, (error, doc) => {
    if (error) {
      console.log(error)
    }
    var productGrid = [];

    var colGrid = 3;
    for (var i = 0; i < doc.length; i += colGrid) {
      productGrid.push(doc.slice(i, i + colGrid))

    }

    console.log(productGrid + "eeeeeeeeeeeeeee5555")
    res.render('shop', {
      title: 'particular',
      products: productGrid,
      chekuse: req.isAuthenticated(),
      totalProducts: totalProducts,
      successMas: successMas,
    });



  })

  /*
    Userb.find({}, (error , doc)=>{
      if(error){
        console.log(error)
      }
      var productGrid = [] ;

      var colGrid = 3 ; 
         for(var i = 0 ; i<doc.length ; i+=colGrid){
           productGrid.push(doc.slice(i , i + colGrid))
           
         }
         

         res.render('shop', { title: 'particular'
         , userbs : productGrid ,
          chekuse : req.isAuthenticated() ,
         totalProducts : totalProducts,
         successMas :successMas ,
        });
        
      

    }) 
  })
  */
  router.post('/checkout', [
    check('name').not().isEmpty().withMessage(' please enter your name'),
    check('FamilyName').not().isEmpty().withMessage(' please enter your FamilyName'),
    check('adress').not().isEmpty().withMessage(' please enter your adress'),
    check('TelephoneNumber').not().isEmpty().withMessage(' please enter your TelephoneNumber'),
    check('TelephoneNumber').isLength({
      min: 5
    }).withMessage('TelephoneNumber equals 10 number'),
  ], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      var validationMassages = [];
      for (var i = 0; i < errors.errors.length; i++) {
        validationMassages.push(errors.errors[i].msg)
      }


      req.flash('signupError', validationMassages);
      res.redirect('checkout')
      return;
    }
    next();

    req.flash('success', 'successfuly bought medicines')
    const order = new Order({
      user: req.user._id,
      cart: req.user.cart,
      name: req.body.name,
      FamilyName: req.body.FamilyName,
      adress: req.body.adress,
      TelephoneNumber: req.body.TelephoneNumber,
      orderPrice: req.user.cart.totalprice,
    })
    order.save((err, resualt) => {
      if (err) {
        console.log(err)
      }
      console.log(resualt)
      Cart.deleteOne({
        _id: req.user.cart._id
      }, (err, doc) => {
        if (err) {
          console.log(err)
        }
        res.redirect('/')
      })

    })
  })
  /*_______fin chekout _______/*
    

  module.exports = router;

  var express = require('express');
  var router = express.Router();
  const product = require('../model/product');
  const Cart = require('../model/cart');
  const cart = require('../model/cart');
  const Order = require('../model/order');
  //const { Result } = require('express-validator');
  const { check, validationResult, Result } = require('express-validator');
  const passport = require('passport');

  //const e = require('express');


  /* GET home page. */
  /*
  router.get('/', function(req, res, next) {
    const successMas = req.flash('success')[0];
    var totalProducts = null ;
    if(req.isAuthenticated()){
      if(req.user.cart){
        totalProducts= req.user.cart.totalquantity ;
      }else{
        totalProducts= 0 ;
      }
      
       
    }
    product.find({}, (error , doc)=>{
      if(error){
        console.log(error)
      }
      var productGrid = [] ;

      var colGrid = 3 ; 
         for(var i = 0 ; i<6 ; i+=colGrid){
           productGrid.push(doc.slice(i , i + colGrid))
           
         }
         

         res.render('index', { title: 'particular'
         , products : productGrid ,
          chekuse : req.isAuthenticated() ,
         totalProducts : totalProducts,
         successMas :successMas ,
        });

      

    })
    
  });
  /* _____  debut ajoute medicines ___*/
  /*
  router.get('/addTocart/:id/:price/:name' , (req , res , next)=>{
    
    req.session.hasCart = true ;
   const cartID = req.user._id ;
   const newproductPrice = parseInt(req.params.price,10)
   const newProduct = {
     _id : req.params.id ,
     price : newproductPrice ,
     name : req.params.name ,
     quantity : 1 ,

   }
   Cart.findById(cartID , (err , cart)=>{
     if(err){
     console.log(err)
     
     }
    if(!cart){
      const newCart = new Cart ({
        _id : cartID ,
        totalquantity : 1 ,
        totalprice : newproductPrice ,
        selectedProduct : [newProduct],
        createAt  : Date.now(),

      })
     
      newCart.save((err , doc)=>{
        if(err){
          console.log(err)
        }
        console.log(doc)
      })
    
    }
        if(cart){
          var indexOfProduct = -1;
       for(var i = 0 ; i<cart.selectedProduct.length ; i++){
        if(req.params.id ===cart.selectedProduct[i]._id){
          indexOfProduct = i ;
          break ;
        }

       }
       if(indexOfProduct>=0){
        cart.selectedProduct[indexOfProduct].quantity =  cart.selectedProduct[indexOfProduct].quantity + 1 ;
        cart.selectedProduct[indexOfProduct].price = cart.selectedProduct[indexOfProduct].price + newproductPrice ;
        cart.totalquantity = cart.totalquantity + 1 ;
        cart.totalprice = cart.totalprice + newproductPrice ;
        cart.createAt = Date.now();
        Cart.updateOne({_id : cartID} , {$set:cart} , (err , doc)=>{
          if(err){
            console.log(err)
          }
          console.log(doc)
          console.log(cart)
        })
      }else{
         cart.totalquantity = cart.totalquantity + 1 ;
         cart.totalprice = cart.totalprice + newproductPrice ;
         cart.selectedProduct.push(newProduct)
         cart.createAt = Date.now();
         Cart.updateOne({_id : cartID} , {$set:cart} , (err , doc)=>{
           if(err){
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
  /*___________fin de ajoute medcines*/
  /* _____ debut medicines  ____*/
  /*
  router.get('/Medicines' , (req , res , next)=>{
    if(!req.isAuthenticated()){
      res.redirect('/users/signin') ;
      return ;
    }
    console.log(req.session.hasCart)
    if(!req.user.cart){
      res.render('Medicines' , { chekuse : true ,
        hasCart :req.session.hasCart,  totalProducts : 0 });
        req.session.hasCart = false ;
        return ;
    }
    const userCart = req.user.cart ;
    const totalProducts = req.user.cart.totalquantity ;
    res.render('Medicines' , { userCart : userCart , chekuse : true ,totalProducts : totalProducts });
  })
  router.get('/deleteMedicines/:index' , (req , res ,next)=>{
    if(req.user.cart){

      const index = req.params.index ;
    
      const userCart = req.user.cart ;
      console.log(userCart.selectedProduct.length); 
      if(userCart.selectedProduct.length<=1){
        cart.deleteOne({_id : userCart._id} , (err , doc)=>{
          if(err){
            console.log(err)
          }
          console.log(doc)
          res.redirect('/Medicines')
        })
      } else{
        userCart.totalprice = userCart.totalprice - userCart.selectedProduct[index].price ;
      userCart.totalquantity = userCart.totalquantity - userCart.selectedProduct[index].quantity ;
    
      userCart.selectedProduct.splice(index , 1) ;
      userCart.createAt = Date.now();
      cart.updateOne({_id : userCart._id} , {$set : userCart} , (err , doc)=>{
        if(err){
          console.log(err)
        }
        console.log(doc)
        res.redirect('/Medicines')
      })
        
      }
    }else{
      res.redirect('/Medicines') 
    }


  })
  /*_______fin medcines ___*/
  /* __________debut checkout________*/
  /*
  router.get('/checkout' , (req , res , next)=>{
    if(req.user.cart){
      console.log(req.user)
      var massageError = req.flash('signupError')
      if(req.user.userName === undefined || req.user.adress === undefined || req.user.telphon === undefined){
        req.flash('profileError'  ,['please update your information before do order'] );
        res.redirect('users/profile')
        return  ;
      }
      res.render('checkout' ,  { chekuse : true , totalProducts : req.user.cart.totalquantity ,
         totalprice : req.user.cart.totalprice,
         masseges : massageError ,
         user : req.user,
         })
    }else{
      res.redirect('/Medicines')
    }
   
  })

  router.get('/thankyou' ,  (req , res , next)=>{
    
    res.render('thankyou')
  })
  router.get('/about' ,  (req , res , next)=>{
    
    res.render('about')
  })
  router.get('/contact' ,  (req , res , next)=>{
    
    res.render('contact')
  })
  router.get('/shop' ,  (req , res , next)=>{
    const successMas = req.flash('success')[0];
    var totalProducts = null ;
    if(req.isAuthenticated()){
      if(req.user.cart){
        totalProducts= req.user.cart.totalquantity ;
      }else{
        totalProducts= 0 ;
      }
      
       
    }
    product.find({}, (error , doc)=>{
      if(error){
        console.log(error)
      }
      var productGrid = [] ;

      var colGrid = 3 ; 
         for(var i = 0 ; i<doc.length ; i+=colGrid){
           productGrid.push(doc.slice(i , i + colGrid))
           
         }
         

         res.render('shop', { title: 'particular'
         , products : productGrid ,
          chekuse : req.isAuthenticated() ,
         totalProducts : totalProducts,
         successMas :successMas ,
        });

      

    }) 
  })
  router.post('/checkout', [
    check('name').not().isEmpty().withMessage(' please enter your name'),
    check('FamilyName').not().isEmpty().withMessage(' please enter your FamilyName'),
    check('adress').not().isEmpty().withMessage(' please enter your adress'),
    check('TelephoneNumber').not().isEmpty().withMessage(' please enter your TelephoneNumber'),
    check('TelephoneNumber').isLength({ min: 5 }).withMessage('TelephoneNumber equals 10 number'),
  ]
   ,(req , res , next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      var validationMassages = [];
      for(var i =0 ; i<errors.errors.length ; i++){
        validationMassages.push(errors.errors[i].msg)
      }
      
      
      req.flash('signupError' , validationMassages);
      res.redirect('checkout')
      return;
    }
    next() ;

    req.flash('success' , 'successfuly bought medicines')
    const order = new Order({
       user : req.user._id ,
       cart : req.user.cart ,
       name : req.body.name ,
       FamilyName : req.body.FamilyName ,
       adress : req.body.adress ,
       TelephoneNumber : req.body.TelephoneNumber ,
       orderPrice : req.user.cart.totalprice ,
    })
    order.save((err , resualt)=>{
      if (err) {
        console.log(err)      
      }
      console.log(resualt)
      Cart.deleteOne({_id : req.user.cart._id} , (err , doc)=>{
        if (err) {
          console.log(err)
        }
      res.redirect('/')
    })

    })
  })
  /*_______fin chekout _______*/
})

module.exports = router;