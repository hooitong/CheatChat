var socket = io.connect();

function addMessage(msg, nick) {
  $("#chatNicks").append('<p>' + nick + '</p>');
  $("#chatEntries").append('<p>' + msg + '</p>');
}

function sentMessage(){
  if($('#messageInput').val() != ""){
    socket.emit('message', $('#messageInput').val());
    addMessage($('#messageInput').val(), "Me");
    $('#messageInput').val('');
  }
}

function setNick(){
  if($('#nickInput').val() != ""){
    socket.emit('setNick', $("#nickInput").val());
    $('#nickInput').val('');
    $('#chatControls').show();
    $('#nickInput').hide();
    $('#nickSet').hide();
  }
}

function joinRoom(){
  if($("#roomInput").val() != ""){
    socket.emit('setRoom', $("#roomInput").val());
    $("#locationStatus").show();
    $("#locationStatus").text('You are now in "' + $("#roomInput").val() + '"');
    $("#roomInput").val('');
  }
}

socket.on('message', function(data){
  addMessage(data['message'], data['nick']);
});

socket.on('adminMessage', function(msg){
    $("#chatEntries").append('<p>' + msg + '</p>');
});

$(function() {
  $("#locationStatus").hide();
  $("#chatControls").hide();
  $("#chatEntries").show();
  $("#chatEntries").append('<p>Welcome to Cheat Chat.</p>');
  $("#nickSet").click(function() {setNick()});
  $("#submit").click(function() {sentMessage()});
  $("#rmJoin").click(function() {joinRoom()});
});
