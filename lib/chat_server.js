var socketio = require('socket.io');
var io;
var users = [];
var parseJSON = require('./json_parser');

exports.listen = function(server) {
  io = socketio.listen(server);
  io.sockets.on('connection', function(socket) {
    handleMessaging(socket);

    handleNameChange(socket, users);

    handleManualRoomChange(socket);

    handleDisconnect(socket);

    handleGeolocation(socket);

    updateRooms(socket);
  });
};

function handleGeolocation(socket) {
  socket.on('sendGeo', function(data) {
    parseJSON(data.lat, data.lon, socket);
  });
}

function handleMessaging(socket) {
  socket.on('message', function(message) {
    var data = {
      'message': message,
      nick: socket.nick
    };
    socket.broadcast.to(socket.room).emit('message', data);
    console.log('user ' + (socket.nick != null ? socket.nick : 'Guest') + ' send this : ' + message + '@' + socket.room);
  });
}

function handleNameChange(socket, users) {
  socket.on('setNick', function(nickname) {
    if (!isTaken(nickname, users)) {
      console.log('user ' + nickname + ' is now in the application');
      users.push(nickname);
      socket.emit('nameTaken', false);
      if (socket.nick !== null) {
        var index = users.indexOf(socket.nick);
        delete users[index];
      }
      socket.broadcast.to(socket.room).emit('adminMessage', socket.nick + ' has changed his nickname to ' + nickname + '.');
      socket.nick = nickname;
    } else {
      socket.emit('nameTaken', true);
    }
  });
}

function handleManualRoomChange(socket) {
  socket.on('setRoom', function(room) {
    joinRoom(socket, room);
  });
}

function handleDisconnect(socket) {
  socket.on('disconnect', function() {
    var index = users.indexOf(socket.nick);
    delete users[index];
    socket.broadcast.to(socket.room).emit('adminMessage', (socket.nick != null ? socket.nick : 'Guest') + ' has left the room.');
    socket.leave(socket.room);
    console.log((socket.nick != null ? socket.nick : 'Guest') + ' has disconnected.');
  });
}

function updateRooms(socket) {
  socket.on('updateRooms', function() {
    socket.emit('updateRooms', getRoomsSortedByUserNum('/'));
  });
}

// Helper Functions
function getRoomUserNum(roomName, namespace) {
  if (!namespace) namespace = '/';
  var room = io.nsps[namespace].adapter.rooms[roomName];
  if (!room) return null;
  return Object.keys(room).length;
}

function getRoomsSortedByUserNum(namespace) {
  if (!namespace) namespace = '/';
  var roomsUsersNum = {};
  var roomNames = [];
  for (var roomName in io.nsps[namespace].adapter.rooms) {
    roomsUsersNum[roomName] = getRoomUserNum(roomName, namespace);
    roomNames.push(roomName);
  }
  return {
    names: roomNames,
    nums: roomsUsersNum
  };
}

function isTaken(request, users) {
  if (users.indexOf(request) == -1) {
    return false;
  } else {
    return true;
  }
}

function joinRoom(socket, room) {
  socket.broadcast.to(socket.room).emit('adminMessage', (socket.nick != null ? socket.nick : 'Guest') + ' has left the room.');
  if (socket.room !== room) {
    socket.leave(socket.room);
    socket.join(room);
    socket.room = room;
  }
  socket.broadcast.to(socket.room).emit('adminMessage', (socket.nick != null ? socket.nick : 'Guest') + ' has joined the room.');
}
