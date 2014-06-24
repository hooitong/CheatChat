// Global Variables
var request = require('request');
var url = 'http://nuslivinglab.nus.edu.sg/api/api/Nearby?lat={LAT}&lon={LON}&radius={RAD}&category=building&output=json';
var radius = 40; // to be decided for accuracy purposes

module.exports = function(lat, lon, socket){
  var parseUrl = url.replace('{LAT}', lat).replace('{LON}', lon).replace('{RAD}', radius);
  request(parseUrl, function(err, res, content){
    var parseResult = JSON.parse(content);
    console.log(parseUrl);
    console.log(parseResult); // debug purpose
    socket.emit('populateBuilding', JSON.stringify(parseResult));
  });
};
