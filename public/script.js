var socket = io.connect();

function addMessage(msg, pseudo) {
    $("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}

function sentMessage(){
	if($('#messageInput').val() != ""){
		socket.emit('message', $('#messageInput').val());
		addMessage($('#messageInput').val(), "Me");
		$('#messageInput').val('');
	}
}

function setPseudo(){
	if($("#pseudoInput").val() != ""){
		socket.emit('setPseudo', $("#pseudoInput").val());
		$('#chatControls').show();
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
	}
}

socket.on('message', function(data){
	addMessage(data['message'], data['pseudo']);
});

$(function() {
    $("#chatControls").hide();
    $("#chatEntries").show();
    $("#chatEntries").append('<div class = "message"><p>Welcome, Start by setting your pseudoname</p></div>');
    $("#pseudoSet").click(function() {setPseudo()});
    $("#submit").click(function() {sentMessage()});
});