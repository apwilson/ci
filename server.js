const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const spawn = require('child_process').spawn;
const express = require('express');
const app = express();
const bodyParser  = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  console.log('request %s from %s with %s %s', req.baseUrl, req.ip, JSON.stringify(req.body, null, 2), process.cwd());
  res.send('Hello World!');
});

app.post('/receivepost', function(req, res) {
  console.log('request %s from %s with %s', req.baseUrl, req.ip, JSON.stringify(req.body, null, 2));
  const id = req.body['head_commit']['id'];
  const repo = req.body['repository']['html_url'];
  const name = req.body['repository']['name'];
  const clone = spawn('sh', ['clone.sh', id, repo, name], {
  cwd: process.cwd(),
  env: process.env
});
  clone.stdout.on('data', function(data) {
    console.log('stdout: %s', data);
  });

  clone.stderr.on('data', function(data) {
    console.log('stderr: %s', data);
  });

  clone.on('close', function(code) {
    console.log('child process exited with code %s',code);
  });
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);
