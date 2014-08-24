var url = 'http://nuslivinglab.nus.edu.sg/api_dev/api/Nearby?lat={LAT}&lon={LON}&radius={RAD}&category=building&output=json';
var request = require('request');
var radius = 100; // Calibrated Value @ 200

module.exports = function(lat, lon, socket) {
  var parseUrl = url.replace('{LAT}', lat).replace('{LON}', lon).replace('{RAD}', radius);
  console.log(parseUrl);
  request(parseUrl, function(err, res, content) {
    var parseResult = JSON.parse(content);
    socket.emit('currentLoc', JSON.stringify(parseResult));
  });
};
