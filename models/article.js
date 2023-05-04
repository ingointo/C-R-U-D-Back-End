// let mongoose = require('mongoose');


// let articleSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     author: {
//         type: String,
//         required: true
//     },
//     body: {
//         type: String,
//         required: true
//     }
// });

// module.exports = mongoose.model('Article', articleSchema);

let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

let Article = mongoose.model('Article', articleSchema);

module.exports = { Article, articleSchema };
