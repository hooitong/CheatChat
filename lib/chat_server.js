// Global Variables
var socketio = require('socket.io');
var io;
var userCount = 0;
var users = [];

exports.listen = function(server){
  io = socketio.listen(server);
  io.sockets.on('connection', function (socket){

    handleMessaging(socket);

    handleNameChange(socket, users);

    handleManualRoomChange(socket);

    handleDisconnect(socket);
  });
}

function handleMessaging(socket){
  socket.on('message', function(message) {
    var data = { 'message' : message, nick : socket.nick };
    socket.broadcast.to(socket.room).emit('message', data);
    console.log("user " + socket.nick + " send this : " + message + '@' + socket.room);
  });
}

function handleNameChange(socket, users){
  socket.on('setNick', function(nickname){
    if(!isTaken(nickname, users)) {
      socket.nick = nickname;
      userCount++;
      console.log("user " + nickname + " is now in the application");
      users.push(nickname);
    }else{
      socket.emit('nameTaken', {
        message : 'Existing nickname already exist in chat.'
      });
    }
  });
};

function handleManualRoomChange(socket){
  socket.on('setRoom', function(room) {
    joinRoom(socket, room);
  });
}

function handleDisconnect(socket){
  socket.on('disconnect', function(){
    var index = users.indexOf(socket.nick);
    delete users[index];
    socket.broadcast.to(socket.room).emit('adminMessage', socket.nick + ' has left the room.');
    socket.leave(socket.room);
    userCount--;
    console.log(socket.nick + ' has disconnected.');
  });
}

// Helper Functions

function isTaken(request, users){
  if(users.indexOf(request) == -1){
    return false;
  } else{
    return true;
  }
}

function joinRoom(socket, room) {
  socket.broadcast.to(socket.room).emit('adminMessage', socket.nick + ' has left the room.');
  socket.leave(socket.room);
  socket.join(room);
  socket.room = room;
  socket.broadcast.to(socket.room).emit('adminMessage', socket.nick + ' has joined the room.');
}
