var http = require('http'),
	fs = require('fs'),
	Q = require('q'),
	querystring = require('querystring');
	cache = {},
	numClients = 0,
	numRequest = 0;

var socketResponses = [];
var bookmarks = {}, socketBookmarkNumber = 1;

var server = http.createServer(function(req, res) {
	var filePath = false;

	if (req.url === '/') {
		filePath = 'public/index.html';
	} 

	//get all dependencies
	if (req.url.split('/')[1] === 'src' || req.url.split('/')[1] === 'style') {
		filePath = 'public' + req.url;
	}

	serveStatic(res, cache, './' + filePath);

	if (req.method == "GET") {
		if (req.url === "/elements") {
			//sendSocketEvent({intent: "select", elementID: "null"}); //Mobile sends this
			io.emit("action", {
				intent: "select", 
				elementID: "null",
				socketID: socketBookmarkNumber++
			}); //Mobile sends this

			bookmarks[socketBookmarkNumber - 1] = res;
		}
	}

	if (req.method == "POST") {
		console.log("there has been a post from:");
		console.log(req.url);
		var requestBody = "";

		req.on('data', function(d) {
			requestBody += d.toString('utf8');
			if (requestBody.length > 1e7) {
				res.writeHead(200, {"content-type" : "text/plain"});
				res.end('your post data was very long');
			}
		});

		req.on('end', function() {
			if (numClients > 0) {
				console.log("about to emit stuff");
				sendSocketEvent(requestBody);
				//send response back, but need to wait for socket response.
				//socket 
			} else {

			}
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

// *********************** THIS IS SOCKET **************************

var io = require('socket.io')(server);

io.on('connection', function(socket) {
	numClients++;
	runTest();
	console.log("connected");

	socket.on('actionResponse', function(data) {
		/*
			Data looks like
			{
				"socketID": 3,
				"data": [Object]
			}
		*/
		if(data.socketID && bookmarks[data.socketID]) {
			bookmarks[data.socketID].end(data.data);
		}
	})
})

io.on('disconnect', function() {
	numClients--;
})

function sendSocketEvent(data) {
	console.log('sexy socket');
	io.emit("action", data);
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


