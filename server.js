var http = require('http'),
	fs = require('fs'),
	cache = {};

var server = http.createServer(function(req, res) {
	var filePath = false;

	if (req.url === '/') {
		filePath = 'public/index.html';
	} 

	//get all dependencies
	var sourcesFolder = req.url.split('/')[1]
	if (sourcesFolder === 'src' || sourcesFolder === 'style') {
		filePath = 'public' + req.url;
	}

	serveStatic(res, cache, './' + filePath);

	if (req.method == "POST") {
		var requestBody = "";

		req.on('data', function(d) {
			requestBody += d.toString('utf8');
			//this makes sure the response is not an infinitely large file
			if (requestBody.length > 1e7) {
				res.writeHead(200, {"content-type" : "text/plain"});
				res.end('your post data was very long');
			}
		});

		req.on('end', function() {
			
		})
	}

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


// *** TESTING POST ***

function runTest() {
	var opts = {
	  host: 'localhost',
	  port: 8080,
	  path: '/elements',
	  method: 'POST',
	  headers: {'content-type':'application/json'}
	}

	var req = http.request(opts, function(res) {
		var data = "";
		res.setEncoding('utf8');
		res.on('data', function(d) {
			data += d;
		})
		console.log(data)
	})

	req.on('error', function(err) {
		console.log("you fucked this up. How could you?");
	})

	req.write('{"intent": "select", "elementID": "5"}');
	req.end();
}


