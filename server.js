var http = require('http'),
	fs = require('fs'),
	cache = {},
	elementStack = [],
	elementStackOffload = [],
	port = process.env.PORT || 3000;

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

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

	if (req.method === 'GET' && req.url === '/poll') {
		res.writeHead(200, {'content-type': 'application/json'});
		res.end(JSON.stringify(elementStack));
		elementStack = [];
	}

	if (req.method == "POST") {
		var requestBody = "";

		req.on('data', function(d) {
			requestBody += d.toString('utf8');
			if (requestBody.length > 1e7) {
				res.writeHead(200, {"content-type" : "text/plain"});
				res.end('error: infinity');
			}
		});

		req.on('end', function() {
			if (req.url == '/action') {
				elementStack.push(requestBody);
				res.writeHead(200, {"content-type": "application/json"});
				res.end(JSON.stringify({msg: "success"}));
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