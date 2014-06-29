var socket = io.connect();
var map;
var markers = {}
var currentLoc;
var currentBuilding;
var initialModal = true;
var initialMap = true;
var locations = {
  'I3':[1.292297,103.775867,'I Cube'],
  'ISS':[1.292149,103.776551,'Institute Of Systems Science'],
  'SH-A':[1.291353,103.775783,'Sheares Hall (Block A)'],
  'SH-E':[1.291353,103.775783,'Sheares Hall (Block E)'],
  'SH-D':[1.291353,103.775783,'Sheares Hall (Block D)'],
  'SH-C':[1.291353,103.775783,'Sheares Hall (Block C)'],
  'SH-B':[1.291353,103.775783,'Sheares Hall (Block B)'],
  'SHALL':[1.291353,103.775783,'Sheares Hall (Communal Hall)'],
  'HSS':[1.292951,103.774415,'Hon Sui Sen Memorial Library'],
  'KR-E':[1.291565,103.774302,'Kent Ridge Hall (Block E)'],
  'KR-D':[1.291565,103.774302,'Kent Ridge Hall (Block D)'],
  'KR-C':[1.291565,103.774302,'Kent Ridge Hall (Block C)'],
  'KR-B':[1.291565,103.774302,'Kent Ridge Hall (Block B)'],
  'KR-A':[1.291565,103.774302,'Kent Ridge Hall (Block A)'],
  'KR HALL':[1.291565,103.774302,'Kent Ridge Hall (Communal Hall)'],
  'LT18':[1.293602,103.774629,'Lecture Theatre 18'],
  'BIZ1':[1.292527,103.77405,'Mochtar Riady Building (Business School Block 1)'],
  'LT19':[1.293918,103.774854,'Lecture Theatre 19'],
  'LT17':[1.293647,103.774185,'Lecture Theatre 17'],
  'COM2':[1.293732,103.774162,'School of Computing Block 2'],
  'BIZ2':[1.294284,103.774439,'Business School Block 2'],
  'THE TERRACE':[1.294442,103.774511,'The Terrace (Business Amd Administration Canteen)'],
  'LT16':[1.294014,103.774006,'Lecture Theatre 16'],
  '17PGP':[1.292534,103.779191,'Prince George\'s Park House 17'],
  'SFAH':[1.293872,103.773265,'Shaw Foundation Alumni House'],
  '18PGP':[1.292387,103.779553,'Prince George\'s Park House 18'],
  'COM1':[1.294978,103.773817,'School of Computing Block 1'],
  'SSLS':[1.295697,103.775032,'Singapore Synchrotron Light Source'],
  'S2':[1.295563,103.778126,'Zoology/Bioscience (Bioscience Block 2)'],
  'LT15':[1.295554,103.773588,'Lecture Theatre 15'],
  'S1':[1.295934,103.778042,'Bioscience Centre Block 1'],
  'VENTUS':[1.294738,103.772595,'UCI Ventus'],
  'THE DECK':[1.294738,103.772595,'The Deck (Arts and Social Sciences Canteen)'],
  'LT14':[1.295733,103.773578,'Lecture Theatre 14'],
  'S3':[1.295638,103.778657,'Botany (Bioscience Block 3)'],
  'AS6':[1.295672,103.773369,'Faculty Of Arts and Social Science Block AS6'],
  'LT8':[1.294147,103.772129,'Lecture Theatre 8'],
  'S1A':[1.29604,103.778207,'Zoology, Physics and Botany Extension (Bioscience Centre Block 1A)'],
  'LT32':[1.296087,103.778443,'Lecture Theatre 32'],
  'LT20':[1.2959,103.77881,'Lecture Theatre 20'],
  'AS5':[1.294238,103.771891,'Faculty Of Arts and Social Science Block AS5'],
  'LT9':[1.294994,103.772343,'Lecture Theatre 9'],
  'H5C':[1.292649,103.771444,'Temasek Hall (Block C)'],
  'H5E':[1.292649,103.771444,'Temasek Hall (Block E)'],
  'CH5':[1.292649,103.771444,'Temasek Hall (Communal Hall)'],
  'H5A':[1.292649,103.771444,'Temasek Hall (Block A)'],
  'H5B':[1.292649,103.771444,'Temasek Hall (Block B)'],
  'H5D':[1.292649,103.771444,'Temasek Hall (Block D)'],
  'S4':[1.295725,103.779192,'Pharmacy (Bioscience Block 4)'],
  'LT10':[1.294941,103.772151,'Lecture Theatre 10'],
  'LT21':[1.295501,103.779514,'Lecture Theatre 21'],
  'H4E':[1.292261,103.780813,'King Edward Vii Hall (Block E)'],
  'H4F':[1.292261,103.780813,'King Edward Vii Hall (Block F)'],
  'H4G':[1.292261,103.780813,'King Edward Vii Hall (Block G)'],
  'H4H':[1.292261,103.780813,'King Edward Vii Hall (Block H)'],
  'H4B':[1.292261,103.780813,'King Edward Vii Hall (Block B)'],
  'H4A':[1.292261,103.780813,'King Edward Vii Hall (Block A)'],
  'CH4':[1.292261,103.780813,'King Edward Vii Hall (Communal Hall)'],
  'H4C':[1.292261,103.780813,'King Edward Vii Hall (Block C)'],
  'H4D':[1.292261,103.780813,'King Edward Vii Hall (Block D)'],
  'AS1':[1.295295,103.77234,'Faculty Of Arts and Social Science Block AS1'],
  'S4A':[1.295891,103.779229,'Annex To S4 (Bioscience Block 4A)'],
  'PGP-FOODGLE':[1.291112,103.780755,'Foodgle Hub (PGP)'],
  'LT35':[1.291112,103.780755,'Lecture Theatre 35'],
  'LT36':[1.291112,103.780755,'Lecture Theatre 36'],
  'AS4':[1.294514,103.771663,'Faculty Of Arts and Social Science Block AS4'],
  'S5':[1.295542,103.779725,'Common Block (Bioscience Block 5)'],
  'S7':[1.296327,103.778897,'Chemistry/Physics (Bioscience Block 7)'],
  'CLB':[1.296527,103.773209,'Central Library'],
  'S6':[1.295174,103.780263,'Science Library (Bioscience Block 6)'],
  'S8':[1.296166,103.779413,'Chemistry (Bioscience Block 8)'],
  'CSLA':[1.296968,103.773808,'Central Library Building Annex'],
  'LT22':[1.295847,103.779834,'Lecture Theatre 22'],
  'AS7':[1.294257,103.771224,'Faculty Of Arts and Social Science Block AS7'],
  'S11':[1.296705,103.778786,'Physics (Bioscience Centre Block 11)'],
  'ADM':[1.297418,103.777552,'University Hall'],
  'UHALL':[1.297418,103.777552,'University Hall'],
  'S9A':[1.295941,103.779978,'Bioscience Centre Block 9A'],
  'CELS':[1.29441,103.781018,'Centre For Life Sciences'],
  'S10':[1.296293,103.779658,'Bioscience Centre Block 10'],
  'S12':[1.297055,103.77867,'Physics (Bioscience Centre Block 12)'],
  'AS3':[1.294817,103.771197,'Faculty Of Arts and Social Science Block AS3'],
  'H7':[1.297756,103.776217,'Ridge View Residences'],
  'H1A':[1.297756,103.776217,'Ridge View Residences (Block H1A)'],
  'S9':[1.296054,103.780048,'Chemistry (Bioscience Block 9)'],
  'LT11':[1.295519,103.771561,'Lecture Theatre 11'],
  'LT12':[1.29507,103.77126,'Lecture Theatre 12'],
  'S13':[1.296771,103.779281,'Physics (Bioscience Centre Block 13)'],
  'S2S':[1.297568,103.774285,'Tropical Marine Science Institute'],
  'PGP-ECAN':[1.291152,103.781627,'PGP E-Canteen'],
  'LT23':[1.296324,103.780065,'Lecture Theatre 23'],
  'LT24':[1.295882,103.780549,'Lecture Theatre 24'],
  'H1B':[1.298121,103.775885,'Ridge View Residences (Block H1B)'],
  'MD2':[1.295022,103.781238,'Medical Department Block 2'],
  'LT13':[1.295102,103.770858,'Lecture Theatre 13'],
  'S14':[1.296867,103.779769,'Mathematics (Bioscience Centre Block 14)'],
  'AS2':[1.295489,103.771071,'Faculty Of Arts and Social Science Block AS2'],
  'H6B':[1.293654,103.770263,'Eusoff Hall (Block B)'],
  'H6E':[1.293654,103.770263,'Eusoff Hall (Block E)'],
  'LT25':[1.296165,103.780522,'Lecture Theatre 25'],
  'H6D':[1.293654,103.770263,'Eusoff Hall (Block D)'],
  'CH6':[1.293654,103.770263,'Eusoff Hall (Communal Hall)'],
  'H6A':[1.293654,103.770263,'Eusoff Hall (Block A)'],
  'H6C':[1.293654,103.770263,'Eusoff Hall (Block C)'],
  'MD4A':[1.295675,103.78094,'Microbiology/Biochemistry (Medical Department Block 4A)'],
  'H1C':[1.298228,103.776431,'Ridge View Residences (Block H1C)'],
  'MD3':[1.295355,103.781184,'Para-Clinical Laboratory/Cofm (Medical Department Block 3)'],
  'LT4':[1.297735,103.773538,'Lecture Theatre 4'],
  'LT3':[1.297684,103.773302,'Lecture Theatre 3'],
  'MD4':[1.295818,103.781005,'Microbiology (Medical Department Block 4)'],
  'S16':[1.296858,103.780267,'Dean\'s Office, Science (Bioscience Centre Block 16)'],
  'H1D':[1.298518,103.775733,'Ridge View Residences (Block H1D)'],
  'FRONTIER':[1.296562,103.780613,'The Frontier (Bio-Science Complex Canteen)'],
  'MD6':[1.295347,103.781532,'Medical Library (Medical Department Block 6)'],
  'MD5':[1.29563,103.78136,'Dean\'s Office (Medicine)/Pgms (Medical Department Block 5)'],
  'YIH':[1.298458,103.774822,'Yusof Ishak House'],
  'S15':[1.297161,103.780069,'School Of Computing (Bioscience Centre Block 15)'],
  'CCE':[1.297555,103.772531,'Computer Centre'],
  'LT31':[1.296952,103.780444,'Lecture Theatre 31'],
  'H1E':[1.298743,103.776216,'Ridge View Residences (Block H1E)'],
  'MD7':[1.296042,103.781311,'Biochemistry (Medical Department Block 7)'],
  'LT26':[1.296539,103.781064,'Lecture Theatre 26'],
  'CELC':[1.29707,103.771516,'Centre For English Language Communication Building'],
  'DSO':[1.29632,103.781248,'Defence Science Organization Building'],
  'LT27':[1.297067,103.780799,'Lecture Theatre 27'],
  'E5':[1.298033,103.772385,'Faculty of Engineering Block 5'],
  'MD11':[1.296026,103.781758,'National University Medical Institute (Medical Department Block 11)'],
  'FCB':[1.299103,103.77567,'Faculty Club'],
  'VIL':[1.298712,103.773653,'Visitor\'s Lodge'],
  'MD9':[1.296707,103.7813,'Physiology (Medical Department Block 9)'],
  'UHC':[1.299188,103.776487,'University Health Centre'],
  'S17':[1.29781,103.780482,'Computational Science Building'],
  'MD10':[1.29646,103.781793,'Medical Department Block 10'],
  'E4A':[1.298601,103.772778,'Faculty of Engineering Block 4A'],
  'LT28':[1.297278,103.78115,'Lecture Theatre 28'],
  'LT29':[1.297154,103.781295,'Lecture Theatre 29'],
  'E4':[1.298467,103.772361,'Faculty of Engineering Block 4'],
  'CFA':[1.299214,103.773864,'Centre For The Arts'],
  'FOD':[1.296962,103.781619,'Faculty of Dentistry Building'],
  'LT34':[1.297823,103.780836,'Lecture Theatre 34'],
  'SDE3':[1.297373,103.770759,'School Of Design And Environment Block 3'],
  'SDE2':[1.297373,103.770759,'School Of Design And Environment Block 2'],
  'SDE1':[1.297373,103.770759,'School Of Design And Environment Block 1'],
  'TECHNO EDGE':[1.298005,103.771453,'Techno Edge (Engineering Canteen)'],
  'SRC1':[1.299628,103.775375,'Sports Recreation Centre Block 1'],
  'LT33':[1.297853,103.780935,'Lecture Theatre 33'],
  'MAC':[1.298051,103.77125,'McDonald\'s Restaurant'],
  'LT6':[1.298777,103.772082,'Lecture Theatre 6'],
  'LT5':[1.298296,103.771382,'Lecture Theatre 5'],
  'EW2':[1.299251,103.772508,'Faculty of Engineering Workshop 2'],
  'E1':[1.298647,103.771109,'Faculty of Engineering Block 1'],
  'SRC2':[1.3004,103.775879,'Sports Recreation Centre Block 2'],
  'H3B':[1.299878,103.773111,'Raffles Hall (Block B)'],
  'CH3':[1.299878,103.773111,'Raffles Hall (Communal Hall)'],
  'H3A':[1.299878,103.773111,'Raffles Hall (Block A)'],
  'H3E':[1.299878,103.773111,'Raffles Hall (Block E)'],
  'H3D':[1.299878,103.773111,'Raffles Hall (Block D)'],
  'H3C':[1.299878,103.773111,'Raffles Hall (Block C)'],
  'H3B-H3D-EXT':[1.299878,103.773111,'Raffles Hall (Communal Hall) Ext'],
  'EW1':[1.298527,103.770762,'Faculty of Engineering Workshop 1'],
  'LT2':[1.299295,103.771468,'Lecture Theatre 2'],
  'MPH':[1.300676,103.775929,'Multi-Purpose Sports Hall (1-4)'],
  'T-LAB':[1.299784,103.772188,'NUS / Temasek Laboratory'],
  'H8':[1.300408,103.773658,'Kuok Foundation House'],
  'LT1':[1.299485,103.771349,'Lecture Theatre 1'],
  'E3':[1.299824,103.771699,'Faculty of Engineering Block 3'],
  'E2':[1.299577,103.771142,'Faculty of Engineering Block 2'],
  'E1A':[1.299391,103.770739,'Faculty of Engineering Block 1A'],
  'E3A':[1.300199,103.771457,'Faculty of Engineering Block 3A'],
  'LT7A':[1.300132,103.77104,'Lecture Theatre 7A'],
  'EA':[1.300213,103.770708,'Faculty of Engineering Block EA'],
  'LT7':[1.300508,103.770949,'Lecture Theatre 7'],
  'OED':[1.301674,103.773675,'Office Of Estate and Development'],
  'E AUDI':[1.300478,103.77055,'Faculty of Engineering Auditorium'],
  'UCC':[1.301738,103.771947,'University Cultral Centre'],
  'YSTCM':[1.302641,103.772552,'Yong Siew Toh Conservatory Of Music'],
  'CREATE-UT':[1.303774,103.774173,'Campus For Research Excellence And Technological Enterprise (CREATE) - University Town'],
  'EDUSPORT':[1.30464322596712,103.772516841191,'Stephen Riady Center'],
  'BB':[1.31877158716359,103.816806108239,'Block B (BTC campus)'],
  'LKS':[1.31950265759855,103.817605185226,'Li Ka Shing Building, BTC Campus'],
  'OTH':[1.31926463466624,103.817996222901,'Oei Tiong Ham Building, BTC Campus']
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
  }
}

function createRoom(){
  socket.emit('setRoom', currentLoc);
  $("#chatEntries").html(' <br><br><br><p>Welcome to <b>'+ locations[currentLoc][2]  +'</b> <br> Click on <a href="#createRoom", data-toggle="modal"><span class="glyphicon glyphicon-globe"></span></a>&nbsp;at the top right hand corner to change room/building.</p>');
  $('#chatEntries').hide().fadeIn(3500);
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
  var content = "<div class='infowindow-content'>" + locations[room][2] + "</div>";
  var infowindow = new google.maps.InfoWindow({
    content: content,
    maxWidth: 300
  });
  google.maps.event.addListener(marker, "click", function () { socket.emit('setRoom', room);
    $("#chatEntries").html(' <br><br><br><p>Welcome to <b>'+ locations[room][2]  +'</b> <br> Click on <a href="#createRoom", data-toggle="modal"><span class="glyphicon glyphicon-globe"></span></a>&nbsp;at the top right hand corner to change room/building.</p>');
    $('#createRoom').modal('hide');
    $('#chatEntries').hide().fadeIn(3500);
  });
  google.maps.event.addListener(marker, 'mouseover', function() { infowindow.open(map,marker); });
  google.maps.event.addListener(marker, "mouseout", function () { infowindow.close(); });
}

$(function() {
  $(window).bind('beforeunload', function(){
      socket.disconnect();
  });
  $('#error').html('Name has already been taken.');
  $('#error').hide();
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
  $("#submit").click(function() {sentMessage()});
  $("#rmCreate").click(function() {createRoom()});
  $('#nickInput').bind("enterKey",function(e){
    if($('#nickInput').val() != ""){
      $('#error').hide();
      setNick();
      socket.on('nameTaken', function(isTaken){
        if(isTaken){
          $('#error').hide().fadeIn(2000);
        } else {
          $('#currentName').text('Currently as ' + cleanInput($("#nickInput").val()));
          $('#setNick').modal('hide');
          $('#chatControls').show();
          setTimeout(function() {
            $('#nickMsg').html('<h3>Change your nickname?</h3>');
            $('#setNick').data('bs.modal').options.backdrop = 'true';
            $('#setNick').data('bs.modal').options.keyboard = 'true';
            $('#closeBtn').html('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
            $('#nickInput').val('');
          }, 1000);
        }
      });
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

function checkMenu() {
  if(initialModal == true && currentLoc == null){
    $('#loading').modal('show');
    initialModal = false;
  }
  if (currentLoc == null) {
      setTimeout("checkMenu();", 1000);
      return;
  } else if(initialMap == true) {
    $('#loading').modal('hide');
    initialModal = false;
    initialMap = false;
    if(currentLoc.localeCompare('Outside NUS') != 0){
      fixMap();
    }else{
      $("#chatEntries").html('<br><br><br><p>You are now assigned to speak with people <i>outside NUS</i>.</p>');
      $('#chatEntries').hide().fadeIn(3500);
      socket.emit('setRoom', currentLoc);
      $('#messageInput').focus();
    }
  } else {
    $('#messageInput').focus();
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
