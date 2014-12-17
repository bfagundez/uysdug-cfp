// web.js
var express = require("express");
var logfmt = require("logfmt");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/uysdugcfp';
var app = express();

app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser());
app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.render('index.ejs',{completed:false});
});

app.post('/save_cfp',function(req,res){
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('cfps', function(er, collection) {
      collection.insert({'name': req.body.name, 'email':req.body.email, 'title':req.body.title, 'abstract':req.body.abstract }, {safe: true}, function(er,rs) {});
    });
  });

  res.render('index.ejs',{completed:true});

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
