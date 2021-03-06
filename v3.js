var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  if(urlObj.pathname.indexOf("getcity") !=-1) {
    console.log("In REST Service");
    fs.readFile('cities.dat.txt', function (err, data) {
      if(err) throw err;
      cities = data.toString().split("\n");
      for(var i = 0; i < cities.length; i++) {
	  console.log(cities[i]);
      }
    });
  } else {
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
      if (err) {
	res.writeHead(404);
	res.end(JSON.stringify(err));
	return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }
}).listen(8080);

