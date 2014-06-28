var socket = io.connect();
var map;
var markers = {}
var currentLoc;
var initialModal = true;
var initialMap = true;
var locations = {
  'LT1':[1.299595, 103.771345],
  'LT2':[1.29699, 103.780984],
  'LT3':[1.29699, 103.780984],
  'LT4':[1.297515,103.773488],
  'LT5':[1.298445,103.771387],
  'LT6':[1.298663,103.771929],
  'LT7':[1.300103,103.77111],
  'LT8':[1.294283,103.772081],
  'LT9':[1.295055,103.772406],
  'LT10':[1.294954,103.772089],
  'LT11':[1.295575,103.77153],
  'LT12':[1.295009,103.771346],
  'LT13':[1.295076,103.771105],
  'LT14':[1.295736,103.773393],
  'LT15':[1.295501,103.773356],
  'LT16':[1.294099,103.774049],
  'LT17':[1.293797,103.774116],
  'LT18':[1.293655,103.774658],
  'LT19':[1.293915,103.774545],
  'LT20':[1.295847,103.778975],
  'LT21':[1.295529,103.779559],
  'LT22':[1.295848,103.779792],
  'LT23':[1.296418,103.779934],
  'LT24':[1.295882,103.780555],
  'LT25':[1.296163,103.780676],
  'LT26':[1.296494,103.781114],
  'LT27':[1.296939,103.781084],
  'LT28':[1.297275,103.78118],
  'LT29':[1.297216,103.781234],
  'LT31':[1.296788,103.780434],
  'LT32':[1.296439,103.778374],
  'LT33':[1.297741,103.781108],
  'LT34':[1.29777,103.780892],
  'LT35':[1.295509,103.781843],

  'AS1':[1.295232,103.772176],
  'AS2':[1.295198,103.771381],
  'AS3':[1.294779,103.771234],
  'AS4':[1.294687,103.771956],
  'AS5':[1.294393,103.772023],
  'AS6':[1.295619,103.773223],
  'AS7':[1.294459,103.771143],

  'UTSRC-LT50':[1.304338,103.773169],
  'UTSRC-LT51':[1.304186,103.773044],
  'UTSRC-LT52':[1.304061,103.773011],
  'UTSRC-LT53':[1.303951,103.772952],
  'UT-AUD1':[1.304061,103.773494],
  'UT-AUD2':[1.304404,103.772708],
  'UT-AUD3':[1.307308,103.773101],
  'ERC-GLR':[1.305907,103.772926],
  'TP-GLR':[1.303893,103.773739],
  'NAK-AUD':[1.305562,103.773222],
  'UTSRC-GLR':[1.304429,103.772747],
  'ERC':[1.305881,103.772896],

  'EA':[1.300275,103.770508],
  'E1':[1.298747,103.771157],
  'E1A':[1.299402,103.770873],
  'E2':[1.299319,103.77119],
  'EW1':[1.298513,103.770832],
  'EW2':[1.299168,103.772549],
  'E3':[1.299394,103.771851],
  'E3A':[1.300384,103.771359],
  'E4':[1.298396,103.772402],
  'E4A':[1.298623,103.772602],
  'E5':[1.29806,103.772444],
  'ENG':[1.300593,103.770639],

  'BIZ1':[1.293547,103.774316],
  'BIZ2':[1.293472,103.775281],

  'COM1':[1.294965,103.773957],
  'COM2':[1.294335,103.774075],
  'i3':[1.29254,103.775601],
  'VCRm':[1.294947,103.774019],
  'RMI':[1.292439,103.775804],

  'S1':[1.295922,103.777842],
  'S2':[1.295721,103.778079],
  'S3':[1.295755,103.778646],
  'S4':[1.29578,103.779129],
  'S5':[1.295604,103.779713],
  'S6':[1.295059,103.78025],
  'S7':[1.296494,103.778907],
  'S8':[1.29625,103.779357],
  'S9':[1.296142,103.779941],
  'S10':[1.296452,103.779715],
  'S11':[1.296821,103.778765],
  'S12':[1.297148,103.778656],
  'S13':[1.296905,103.779198],
  'S14':[1.296997,103.779773],
  'S15':[1.297258,103.780307],
  'S16':[1.296847,103.780299],
  'S9A':[1.29599,103.779893],
  'S17':[1.297778,103.780599],
  'S4A':[1.295973,103.77921],

  'MD1':[1.295361,103.780669],
  'MD2':[1.294951,103.781103],
  'MD3':[1.295404,103.781028],
  'MD4':[1.295781,103.780936],
  'MD4A':[1.29568,103.780811],
  'MD5':[1.295664,103.781353],
  'MD6':[1.295438,103.78177],
  'MD7':[1.296176,103.781047],
  'MD8':[1.296612,103.780746],
  'MD9':[1.29673,103.781255],
  'MD10':[1.296486,103.781797],
  'MD11':[1.29605,103.781731],
  'FOD': [1.296962,103.781619],

  'USP-SR1':[1.30646,103.773571],
  'USP-SR2':[1.30646,103.773571],
  'USP-TR1':[1.30646,103.773571],
  'MLounge':[1.30646,103.773571],
}

function cleanInput (input) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(input));
  return div.innerHTML;
}

function addMessage(msg, nick) {
  var message = cleanInput(msg);
  if(nick==="Me"){
      $("#chatEntries").append('<div class="row"><div class="me">' + nick + '</div><div class="bubble bubble-alt">' + message + '</div></div>');
  }
  else{
      $("#chatEntries").append('<div class="row"><div class="you">' + nick + '</div><div class="bubble yellow">' + message + '</div></div>');
  }

  window.scrollTo(0,document.body.scrollHeight);
}

function sentMessage(){
  if($('#messageInput').val() != ""){
      socket.emit('message', cleanInput($('#messageInput').val()));
      addMessage($('#messageInput').val(), "Me");
      $('#messageInput').val('');
  }
}

function setNick(){
  if($('#nickInput').val() != ""){
      socket.emit('setNick', cleanInput($("#nickInput").val()));
      $('#nickInput').val('');
      $('#chatControls').show();
  }
}

function createRoom(){
  socket.emit('setRoom', currentLoc);
  $("#chatEntries").html(' <br><br><br><p>Welcome to Building <b>'+ currentLoc +'</b> <br> Click on <a href="#createRoom", data-toggle="modal"><span class="glyphicon glyphicon-globe"></span></a>&nbsp;at the top right hand corner to change room/building.</p>');
  $('#chatEntries').hide().fadeIn(5000);
}

socket.on('message', function(data){
    addMessage(data['message'], data['nick']);
});

socket.on('adminMessage', function(msg){
  $("#chatEntries").append('<p align="center">' + msg + '</p>');
});

socket.on('updateRooms', function(data){
  for(roomIndex in data.names){
    var room = data.names[roomIndex];
    if(locations[room] != null){
        if(markers[room] == null){
          if(data.nums[room] != 0){
            latlon = new google.maps.LatLng(locations[room][0], locations[room][1]);
            var marker = new MarkerWithLabel({
              position: latlon,
              map: map,
              draggable: false,
              labelContent: data.nums[room],
              icon: "images/chat_marker.png",
              labelAnchor: new google.maps.Point(-11, 53),
              labelClass: "labels",
              labelInBackground: false,
              animation: google.maps.Animation.DROP
            });
            markers[room] = marker;
            fixLocalScope(room, marker);
            if(room.localeCompare(currentLoc) == 0){
              $('#rmCreate').prop('disabled', true);
              $('#creationSection').attr('hidden', true);
            }
          }
        } else {
          if(data.nums[room] != 0){
            markers[room].set('labelContent', data.nums[room]);
          }else{
            markers[room].setMap(null);
            markers[room] = null;
            if(room.localeCompare(currentLoc) == 0){
              $('#rmCreate').prop('disabled', false);
              $('#creationSection').attr('hidden', false);
            }
          }
        }
    }
  }
});

function fixLocalScope(room, marker){
  var content = "<div class='infowindow-content'>" + room + "</div>";
  var infowindow = new google.maps.InfoWindow({
    content: content,
    maxWidth: 300
  });
  google.maps.event.addListener(marker, "click", function () { socket.emit('setRoom', room);
    $("#chatEntries").html(' <br><br><br><p>Welcome to Building <b>'+ room +'</b> <br> Click on <a href="#createRoom", data-toggle="modal"><span class="glyphicon glyphicon-globe"></span></a>&nbsp;at the top right hand corner to change room/building.</p>');
    $('#createRoom').modal('hide');
    $('#chatEntries').hide().fadeIn(5000);
  });
  google.maps.event.addListener(marker, 'mouseover', function() { infowindow.open(map,marker); });
  google.maps.event.addListener(marker, "mouseout", function () { infowindow.close(); });
}

$(function() {
  $("#locationStatus").text("loading");
  getLocation();
  $('#nickMsg').html('<h3>What\'s your nickname?</h3>');
  $('#setNick').on('shown.bs.modal', function () {
    $('#nickInput').focus();
  })
  $('#createRoom').on('hidden.bs.modal', function () {
    $('#messageInput').focus();
  })
  $('#setNick').on('hidden.bs.modal', function () {
    checkMenu();
  })
  $('#setNick').modal('show');
  $("#chatControls").hide();
  $("#chatEntries").show();
  $("#chatEntries").html(' <br><br><br><p>Welcome to CheatChat Lobby <br> Click on <a href="#createRoom", data-toggle="modal"><span class="glyphicon glyphicon-globe"></span></a>&nbsp;at the top right hand corner to start.</p>');
  $("#nickSet").click(function() {setNick()});
  $("#submit").click(function() {sentMessage()});
  $("#rmCreate").click(function() {createRoom()});
  $('#nickInput').bind("enterKey",function(e){
    if($('#nickInput').val() != ""){
      $('#currentName').text('Currently as ' + cleanInput($("#nickInput").val()));
      setNick();
      $('#setNick').modal('hide');
      setTimeout(function() {
        $('#nickMsg').html('<h3>Change your nickname?</h3>');
        $('#setNick').data('bs.modal').options.backdrop = 'true';
        $('#setNick').data('bs.modal').options.keyboard = 'true';
        $('#closeBtn').html('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
    }, 1000);
    }
  });
  $('#nickInput').keyup(function(e){
      if(e.keyCode == 13)
      {
          $(this).trigger("enterKey");
      }
  });
  $('#messageInput').bind("enterKey",function(e){
    if($('#messageInput').val() != ""){
      sentMessage();
    }
  });

  $('#messageInput').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
  });
});

function autoMap(){
  if(initialMap == true){
    fixMap();
    initialMap = false;
  }else{
    $('#messageInput').focus();
  }
}

function checkMenu() {
  if(initialModal == true && currentLoc == null){
    $('#loading').modal('show');
    initialModal = false;
  }
  if (currentLoc == null) {
      setTimeout("checkMenu();", 1000);
      return;
  } else {
    $('#loading').modal('hide');
    initialModal = false;
    if(currentLoc.localeCompare('Outside NUS') != 0){
      autoMap();
    }else{
      $("#chatEntries").html('<br><br><br><p>You are now assigned to speak with people <i>outside NUS</i>.</p>');
      $('#chatEntries').hide().fadeIn(5000);
      socket.emit('setRoom', currentLoc);
      $('#messageInput').focus();
    }
  }
}

function fixMap(){
  $('#createRoom').modal('show');
  setTimeout(function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  }, 300);
}

function getLocation() {
  var geoOptions = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
  };

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, geoError, geoOptions);
  } else {
    geoError();
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  socket.emit('sendGeo', { 'lat' : lat, 'lon' : lon });

  socket.on('currentLoc', function(json){
    var jsonObj = $.parseJSON(json);
    if(jsonObj[0] != null) {
      lat = jsonObj[0].lat;
      lon = jsonObj[0].lon;
      $('#locationStatus').text(jsonObj[0].name);
      currentLoc = jsonObj[0].code;
    } else {
      currentLoc = 'Outside NUS';
      $('#locationStatus').text('Outside NUS');
    }

    if(currentLoc.localeCompare('Outside NUS') == 0){
      $("[rel=tooltip]").tooltip({ placement: 'bottom'});
    } else{
      $("#mapOpen").click(function(){fixMap()});
    }

    latlon = new google.maps.LatLng(lat, lon);

    var myOptions={
      center:latlon,zoom:16,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      mapTypeControl:false,
      navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }

    map = new google.maps.Map(document.getElementById('mapholder'),myOptions);

    setInterval(function() {
      socket.emit('updateRooms');
    }, 1000);
  });
}

function geoError(){
  $("[rel=tooltip]").tooltip({ placement: 'bottom'});
  currentLoc = 'Outside NUS';
  $('#locationStatus').text('Outside NUS');
}
