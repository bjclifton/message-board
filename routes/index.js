var express = require('express');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{messages});
});

router.get('/new', function (req, res, next) {
  res.render('form');
});

router.post('/new', function (req, res, next) {
  const author = req.body.author;
  const text = req.body.message;
  const message = { text: text, user: author, added: new Date() };
  messages.push(message);
  const io = req.app.get('io');
  io.emit('chat message', message);
  res.redirect('/');
});

module.exports = router;
