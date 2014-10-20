
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var smile = require('cool-ascii-faces');


app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/smile', function(req,res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		text: smile()
	}));
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
