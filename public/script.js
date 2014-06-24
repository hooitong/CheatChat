var socket = io.connect();

function addMessage(msg, nick) {

    if(nick==="Me"){
        $("#chatEntries").append('<div style="float:right">'+nick+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><br><br><div class="bubbleRight" >'+msg+ '</div>');
    }
    else{
        $("#chatEntries").append('<div style="float:left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+nick+'</div><br><br><div class="bubbleLeft" >'+msg+ '</div>');
    }


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
        $("#locationStatus").text($("#roomInput").val());
        $("#roomInput").val('');
    }
}

socket.on('message', function(data){
    addMessage(data['message'], data['nick']);
});

socket.on('adminMessage', function(msg){
    $("#chatEntries").append('<p><strong>' + msg + '<strong></p>');
});

$(function() {
    $('#setpseudo').modal('show');
    $("#chatControls").hide();
    $("#chatEntries").show();
    $("#locationStatus").text("lobby");
    $("#nickSet").click(function() {setNick()});
    $("#submit").click(function() {sentMessage()});
    $("#rmJoin").click(function() {joinRoom()});
});
