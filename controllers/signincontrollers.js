module.exports = {
  index: (req, res) => {
    req.app.locals.layout = "signin";
    res.render("singin/index");
  },
  //   singinget: (req,res) => {
  //    res.render('singin/index');
  //  },
  //   singinpost: (req,res) =>{

  //     const newUer = new
  //    res.send('sahit pour ansqri');
  // },
};
