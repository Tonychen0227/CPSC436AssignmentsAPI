var express = require('express');
var router = express.Router();
const shortid = require('shortid');
var Messages = require('../mongo/messages.js')

var messages = []

/* GET users listing. */
router.get('/', function(req, res, next){
  Messages.getMessages().then(success => {
    messages = success
    res.json(messages)
  }).catch(err => {
    next(err);
  })
});

router.post('/', function(req, res, next) {
  if (req.body.text == null || req.body.text == "") {
    res.status(500).send("You must include message text! E.g. {text: x, details: x}");
    return;
  }
  if (req.body.id == null) {
    req.body.id = shortid.generate();
  }
  var parsedMessage = {
    "id": req.body.id,
    "text": req.body.text,
    "details": req.body.details
  }
  Messages.insertMessage(parsedMessage).then(success => {
    Messages.getMessages().then(success => {
      messages = success
      res.json(messages)
    }).catch(err => {
      throw new Error(err);
    })
      }).catch(err => {
        next(err);
      })
})

router.delete('/', function(req, res, next) {
  if (req.body == null || req.body.idToDelete == null) {
    Messages.deleteAllMessages().then(success => {
      Messages.getMessages().then(success => {
        messages = success
        res.json(messages)
      }).catch(err => {
        throw new Error(err);
      })
    }).catch(err => {
      next(err);
    })
  }
  else if (req.body.idToDelete != null){
    Messages.deleteMessage(req.body.idToDelete).then(success => {
      Messages.getMessages().then(success => {
        messages = success
        res.json(messages)
      }).catch(err => {
        throw new Error(err);
      })
    }).catch(err => {
      next(err);
    })
  }
})

router.put('/', function(req, res, next) {
  if (req.body.id == null) {
    res.status(500).send('You must include a id! E.g. {id: x, text: x, details: x}');
    return;
  }
  if (req.body.text == null || req.body.text == "") {
    res.status(500).send("You must include message text! E.g. {id: x, text: x, details: x}");
    return;
  }
  if (!req.body.details) {
    req.body.details = ""
  }
  Messages.updateOneMessage(req.body.id, req.body.text, req.body.details).then(success => {
    Messages.getMessages().then(success => {
      messages = success
      res.json(messages)
    }).catch(err => {
      throw new Error(err);
    })
  }).catch(err => {
    next(err);
  })
})

module.exports = router;
