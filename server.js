
var http = require('http'),
	url = require('url'),
	fs = require('fs'),
	cache = {};

http.createServer(function(req, res) {
	var filePath = false;

	if (req.url === '/') {
		filePath = 'client/index.html';
	}

	serveStatic(res, cache, './' + filePath);

}).listen(8080, function() {console.log("server is now listening")});

function sendFile(response, data) {
	response.writeHead(200, {"content-type": "text/html"});
	response.end(data);
}

function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

function serveStatic(response, cache, absPath) {
	if (cache[absPath]) {
		sendFile(response, cache[absPath]);
	} else {
		fs.exists(absPath, function(exists) {
			if (exists) {
				fs.readFile(absPath, function(err, data) {
					if (err) {
						send404(response);
					} else {
						cache[absPath] =  data;
						sendFile(response, data);
					}
				})
			} else {
				send404(response);
			}
		})
	}
}