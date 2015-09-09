var express = require('express');
var bodyParser = require('body-parser');
var parseString = require('xml2js').parseString;
var request = require('superagent');
var beautify = require('js-beautify').js_beautify;


var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/search', function(req, res) {
  request
    .get('https://www.nyaa.eu/?page=rss&cats=1_37&term=' + req.query.q + '&filter=2')
    .buffer()
    .end(function(err, resNyaa) {
      if (err) console.log(err);
      parseString(resNyaa.text, function(err, result) {
        var json = JSON.stringify(result);
        res.send(beautify( json, {indent_size: 2}));
      });
    });
});

app.listen(1337, function() {
  console.log('Listening on port: 1337');
});
