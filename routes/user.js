var express = require('express');
var router = express.Router();
const {
  body,
  validationResult
} = require('express-validator');


let {
  Article
} = require('../models/article');


let {User} = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {

  Article.find({})
    .then(articles => {
      res.render('index', {
        title: 'Medicines',
        articles: articles
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/add', function (req, res) {
  res.render('add', {
    title: 'Add Article'
  })
});

router.post('/add', [
  body('name').notEmpty().withMessage('name is required'),
  body('price').notEmpty().withMessage('price is required'),
  body('details').notEmpty().withMessage('Details is required'),
], function (req, res) {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('add', {
      title: 'Add Article',
      errors: errors.array()
    })
  } else {
    let article = new Article({
      name: req.body.name,
      price: req.body.details,
      details: req.body.price
    });
    article.save()
      .then(() => {
        req.flash('success', 'Article Updated')
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }
});


router.get('/medicines/:id', (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      res.render('medicine', {
        article: article
      })
    })
})

router.get('/medicines/edit/:id', (req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      res.render('edit', {
        title: 'Edit',
        article: article
      })
    })
})

router.post('/medicines/edit/:id', function (req, res) {
  let article = {};
  article.name = req.body.name;
  article.price = req.body.price;
  article.details = req.body.details;

  let query = {
    _id: req.params.id
  }
  Article.updateOne(query, article)
    .then(() => {
        req.flash('success', 'Article Updated')
        res.redirect('/'); 
    })
    .catch(err => {
      console.log(err);
      return;
    });
});


router.get('/articles/delete/:id', function (req, res) {
  let article = new Article();
  article.name = req.body.name;
  article.price = req.body.price;
  article.details = req.body.details;
  let query = {
    _id: req.params.id
  };
  Article.deleteOne(query, article)
    .then(() => {
      res.redirect('/')
    })
    .catch(err => {
      console.log(err);
      return;
    });
});


router.get('/login', function(req, res){
    res.render('login')
});

router.get('/logout', function(req, res){
    req.session.destroy = null;
        res.redirect('/login')
});

router.post('/login', async function(req, res){
    let query = {username: req.body.username, password: req.body.password};
    User.findOne(query)
    .then((query) => {
      if(query) {
        req.session.username = query.username;
        res.redirect('/');
      } else {
        req.flash('danger', 'Invalid Login')
        res.redirect('/login');
    }
    })
});



module.exports = router;


