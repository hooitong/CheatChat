var socket = io.connect();

// Credits to ModCrasher for the hardcoded geolocations
var locations = {
  //LTs
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

  //FASS
  'AS1':[1.295232,103.772176],
  'AS2':[1.295198,103.771381],
  'AS3':[1.294779,103.771234],
  'AS4':[1.294687,103.771956],
  'AS5':[1.294393,103.772023],
  'AS6':[1.295619,103.773223],
  'AS7':[1.294459,103.771143],

  //Utown
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


  //Engineering
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

  //Business
  'BIZ1':[1.293547,103.774316],
  'BIZ2':[1.293472,103.775281],

  //Computing
  'COM1':[1.294965,103.773957],
  'COM2':[1.294335,103.774075],
  'i3':[1.29254,103.775601],
  'VCRm':[1.294947,103.774019],
  'RMI':[1.292439,103.775804],

  //Science
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

  //Medicine
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


  //USP
  'USP-SR1':[1.30646,103.773571],
  'USP-SR2':[1.30646,103.773571],
  'USP-TR1':[1.30646,103.773571],
  'MLounge':[1.30646,103.773571],
}
var map;
var markers = {}

function addMessage(msg, nick) {
  if(nick==="Me"){
      $("#chatEntries").append('<br><br><div style="float:right; padding-right:35px; padding-bottom:20px">'+nick+'<br></div><br><br><div class="bubbleRight" >'+msg+ '</div>');
  }
  else{
      $("#chatEntries").append('<div style="float:left; padding-left:35px">'+nick+'</div><br><br><div class="bubbleLeft" >'+msg+ '</div>');
  }

  window.scrollTo(0,document.body.scrollHeight);
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

socket.on('updateRooms', function(data){
  for (var key in markers) { // remove empty markers
    if(data.names.indexOf(key) == -1){
      markers[key].setMap(null);
      markers[key] = null;
    }
  }

  for(roomIndex in data.names){
    var room = data.names[roomIndex];
    if(locations[room] != null){
      if(markers[room] == null){
        latlon = new google.maps.LatLng(locations[room][0], locations[room][1]);
        var marker = new MarkerWithLabel({
          position: latlon,
          map: map,
          draggable: false,
          labelContent: data.nums[room], // your number
          icon: "images/chat_marker.png",
          labelAnchor: new google.maps.Point(-11, 53), // Calibrated with image
          labelClass: "labels", // the CSS class for the label
          labelInBackground: false
        });
        markers[room] = marker;
      } else {
        markers[room].set('labelContent', data.nums[room]);
      }
    }
  }
});

$(function() {
  $('#setNick').modal('show');
  $("#chatControls").hide();
  $("#chatEntries").show();
  $("#chatEntries").append(' <br><br><br><p>Welcome to CheatChat Lobby <br> Click on <a href="#createRoom", data-toggle="modal"><span class="glyphicon glyphicon-globe"></span></a>&nbsp;at the top right hand corner to start.</p>');
  $("#locationStatus").text("lobby");
  $("#nickSet").click(function() {setNick()});
  $("#submit").click(function() {sentMessage()});
  $("#rmJoin").click(function() {joinRoom()});
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  socket.emit('sendGeo', { 'lat' : lat, 'lon' : lon });

  socket.on('currentLoc', function(json){
    var jsonObj = $.parseJSON(json);
    if(jsonObj[0] != null) {
      // in NUS, use first location (nearest based on json response)
      lat = jsonObj[0].lat;
      lon = jsonObj[0].lon;
      $('#locationStatus').text(jsonObj[0].name);
    } else {
      // outside NUS
      console.log('outside NUS, no building found.');
      $('#locationStatus').text('Outside NUS');
    }

    latlon = new google.maps.LatLng(lat, lon)
    mapholder = document.getElementById('mapholder')
    mapholder.style.height='400px'; // to be moved to css
    mapholder.style.width='600px';

    var myOptions={
      center:latlon,zoom:16,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      mapTypeControl:false,
      navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }

    map = new google.maps.Map(document.getElementById('mapholder'),myOptions);
    setInterval(function() {
      socket.emit('updateRooms');
    }, 5000);
  });
}
