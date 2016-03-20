var express = require('express');
var app = express();
var bodyParser  = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  console.log('request %s from %s with %s', req.baseUrl, req.ip, JSON.stringify(req.body, null, 2));
  res.send('Hello World!');
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Express Server listening on port %s', server.address().port);
});
