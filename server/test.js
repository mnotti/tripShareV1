var http = require("http");

var options = {
  "method": "POST",
  "hostname": "52.38.225.15",
  "port": "8080",
  "path": "/destinations",
  "headers": {}
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"city\"\r\n\r\nLondon\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"country\"\r\n\r\nEngland\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"destName\"\r\n\r\nBig Ben\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"startdate\"\r\n\r\n2016/02/11\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"enddate\"\r\n\r\n2016/03/12\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"rating\"\r\n\r\n5\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"comments\"\r\n\r\nSo much fun!\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"email\"\r\n\r\nrjromanas@gmail.com\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"tripname\"\r\n\r\nMy Europe Trip\r\n-----011000010111000001101001--");
req.end();