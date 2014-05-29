var express = require('express');
var http = require('http');
var app = express();
var server = app.listen(process.env.PORT || 5000);
var jade = require('jade');
var MemoryStore = express.session.MemoryStore;
var sessionStore = new MemoryStore();
var chatServer = require('./lib/chat_server').listen(server);


app.use(express.cookieParser());
app.use(express.session({store: sessionStore, secret: 'secret', key: 'express.sid'}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('home.jade');
});