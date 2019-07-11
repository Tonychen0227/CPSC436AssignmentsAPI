var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const shortid = require('shortid');

// Connection URL
var url = 'mongodb://admin:admin@cpsc436-basketball-shard-00-00-kbwxu.mongodb.net:27017,cpsc436-basketball-shard-00-01-kbwxu.mongodb.net:27017,cpsc436-basketball-shard-00-02-kbwxu.mongodb.net:27017/test?ssl=true&replicaSet=CPSC436-Basketball-shard-0&authSource=admin&retryWrites=true&w=majority';

var defaultMessages = [{"text": "Hello world",
  "id": shortid.generate(), "details": "Boo!"}, {"text": "Goodbye world",
  "id": shortid.generate(), "details": "Foo!"}]

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const messagesCollection = db.collection('messages')
  messagesCollection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs.length)
    if (docs.length == 0) {
      messagesCollection.insertMany(defaultMessages);
    }
  });
});

var exports = module.exports = {}

module.exports.getMessages = function() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      const messagesCollection = db.collection('messages')
      messagesCollection.find({}).toArray(function(err, docs) {
        if (err != null) {
          reject(err)
        }
        console.log("Found the following records");
        console.log(docs)
        resolve(docs)
      });
    });
  });
}

module.exports.insertMessage = function(message) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const messagesCollection = db.collection('messages')
      messagesCollection.insert(message, function(err, docs) {
        if (err != null) {
          reject(err)
        }
        console.log("Found the following records");
        console.log(docs)
        resolve(docs)
      });
    });
  });
}

module.exports.deleteMessage = function(id) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const messagesCollection = db.collection('messages')
      messagesCollection.deleteOne({id: id}, function(err, docs) {
        if (err != null) {
          reject(err)
        }
        console.log("Found the following records");
        console.log(docs)
        resolve(docs)
      });
    });
  });
}

module.exports.deleteAllMessages = function() {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const messagesCollection = db.collection('messages')
      messagesCollection.remove({}, function(err, docs) {
        if (err != null) {
          reject(err)
        }
        console.log("Found the following records");
        console.log(docs)
        resolve(docs)
      });
    });
  });
}

module.exports.updateOneMessage = function(id, text, details) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const messagesCollection = db.collection('messages')
      messagesCollection.updateOne({id: id}, {$set: {
        "text": text,
        "details": details
      }}, function(err, docs) {
        if (err != null) {
          reject(err)
        }
        console.log("Found the following records");
        console.log(docs)
        resolve(docs)
      });
    });
  });
}
