var socketio = require('socket.io');
var cookie = require('cookie');
var connect = require('connect');
var io;
var userCount = 0;
var users = {};
var Session = require('connect').middleware.session.Session;

exports.listen = function(server){
    io = socketio.listen(server);
    io.set('log level', 1);
    setPersistance(io)
    io.sockets.on('connection', function (socket){

        handleMessaging(socket);
        assignName(socket);
    });
}

function setPersistance(io){
    io.set('authorization', function (data, accept) {
        if (data.headers.cookie) {
            data.cookie = cookie.parse(data.headers.cookie);
            data.sessionID = data.cookie['express.sid'].substring(2, 26);
            console.log(data.name);
        }
        else {
           return accept('No cookie transmitted.', false);
        }
        accept(null, true);
    });
}

function assignName(socket){
    socket.on('setPseudo', function(data){
        socket.set('pseudo', data);
        console.log("user " + data + " is now in the application");
        socket.handshake.name = data;
    });
}

function handleMessaging(socket){
    socket.on('message', function(message) {
        socket.get('pseudo', function (error, name){
            var data = { 'message' : message, pseudo : name };
            socket.broadcast.emit('message', data);
            console.log("user " + name + " send this : " + message);
        });
    });
}