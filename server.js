var http = require('http'),
	fs = require('fs'),
	cache = {},
	elementStack = [],
	port = process.env.PORT || 3000;

var server = http.createServer(function(req, res) {
	var filePath = false;

	if (req.url === '/') {
		filePath = './client/index.html';
		res.writeHead(200, {'content-type': 'text/html'});
		res.end(getFileData(filePath));
	} 

	var sourcesFolder = req.url.split('/')[1]
	// console.log(sourcesFolder);
	filePath = './client' + req.url;

	if (sourcesFolder === 'src') {
		loadScript(res, filePath);
	}

	if (sourcesFolder === 'style') {
		loadStyles(res, filePath);
	}

	if (req.method === 'GET') {
		if (req.url === '/poll') {
			// console.log('we are polling');
			res.writeHead(200, {'content-type': 'application/json'});
			// console.log(elementStack);
			res.end(JSON.stringify(elementStack));
			//elementStack = [];
		}
	}

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
			console.log("IM IN HERE");
			if (req.url == '/action') {
				console.log(requestBody);
				elementStack.push(requestBody);
				res.writeHead(200, {"content-type": "application/json"});
				res.end(JSON.stringify({msg: "hello there"}));
			}	
		})
	}

}).listen(port);
console.log("Server Running on Port: "+port);

function loadScript(response, absPath) {
	response.writeHead(200, {"content-type": "application/javascript"});
	response.end(getFileData(absPath));
}

function loadStyles(response, absPath) {
	response.writeHead(200, {"content-type": "text/css"});
	response.end(getFileData(absPath));
}

function getFileData(absPath) {
	var data = fs.readFileSync(absPath);
	return data.toString('utf8');
}

// *** TESTING POST ***

// setInterval(runTest, 2000);

function runTest() {
	var opts = {
	  host: 'localhost',
	  port: 3000,
	  path: '/action',
	  method: 'POST',
	  headers: {'content-type':'application/json'}
	}

	var req = http.request(opts, function(res) {
		var data = "";
		res.setEncoding('utf8');
		res.on('data', function(d) {
			console.log(d);
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


