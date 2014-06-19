var socket = io.connect();

function addMessage(msg, nick) {
  $("#chatEntries").append('<div class="message"><p>' + nick + ' : ' + msg + '</p></div>');
}

function sentMessage(){
  if($('#messageInput').val() != ""){
    socket.emit('message', $('#messageInput').val());
    addMessage($('#messageInput').val(), "Me");
    $('#messageInput').val('');
  }
}

function setNick(){
  if($("#nickInput").val() != ""){
    socket.emit('setNick', $("#nickInput").val());
    $('#chatControls').show();
    $('#nickInput').hide();
    $('#nickSet').hide();
  }
}

function joinRoom(){
  if($("#roomInput").val() != ""){
    socket.emit('setRoom', $("#roomInput").val());
    $("#locationStatus").show();
    $("#locationStatus").append('You are now in "' + $("#roomInput").val() + '"');
    $("#roomInput").val() = "";
  }
}

socket.on('message', function(data){
  addMessage(data['message'], data['nick']);
});

socket.on('adminMessage', function(msg){
    $("#chatEntries").append('<div class="notification"><p>' + msg + '</p></div>');
});

$(function() {
  $("#locationStatus").hide();
  $("#chatControls").hide();
  $("#chatEntries").show();
  $("#chatEntries").append('<div class = "message"><p>Welcome to Cheat Chat.</p></div>');
  $("#nickSet").click(function() {setNick()});
  $("#submit").click(function() {sentMessage()});
  $("#rmJoin").click(function() {joinRoom()});
});
