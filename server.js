var express = require('express');
var http = require('http');
var app = express();
var server = app.listen(process.env.PORT || 5000);
var jade = require('jade');
var chatServer = require('./lib/chat_server').listen(server);
app.use(express.compress());
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });

app.use(function(req, res, next) {
    if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=86400000');
    res.setHeader("content_security_policy", "script-src 'self' https://maps.googleapis.com https://maps.gstatic.com; object-src 'self'");
    return next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('home.jade');
});
