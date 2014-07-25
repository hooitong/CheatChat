var url = 'http://nuslivinglab.nus.edu.sg/api/api/Nearby?lat={LAT}&lon={LON}&radius={RAD}&category=building&output=json';
var request = require('request');
var radius = 100; // Calibrated Value @ 100

module.exports = function(lat, lon, socket) {
  var parseUrl = url.replace('{LAT}', lat).replace('{LON}', lon).replace('{RAD}', radius);
  request(parseUrl, function(err, res, content) {
    var parseResult = JSON.parse(content);
    socket.emit('currentLoc', JSON.stringify(parseResult));
  });
};
