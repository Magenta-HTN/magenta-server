$(document).ready(function() {

	// Initialize template
	var temp = new Template(), body = $('body');

	$(window).resize(function() {
		temp.updateDisplayNumbers();
	});

	var initialInputs = [
		{
			"intent": "ADD",
			"type": "div",
			"html": "",
			"styles": [
				{
					"property": "background",
					"value": "white"
				},{
					"property": "width",
					"value": "80%"
				},{
					"property": "height",
					"value": "auto"
				},{
					"property": "padding",
					"value": "3% 5%"
				},{
					"property": "margin",
					"value": "5%"
				},{
					"property": "border",
					"value": "1px solid red"
				}
			]
		},{
			"intent": "ADD",
			"type": "h4",
			"html": "Hello World",
			"styles": [
				{
					"property": "color",
					"value": "red"
				},{
					"property": "text-align",
					"value": "center"
				},{
					"property": "font-style",
					"value": "italic"
				}
			],
			"parent": 1
		},{
			"intent": "ADD",
			"type": "p",
			"html": "lorem ipsum",
			"styles": [
				{
					"property": "color",
					"value": "#4F0025"
				}
			],
			"parent": 1
		}
	];

	// Add tests
	_.forEach(initialInputs, function(inp) {
		determineAction(inp);
	});

	function determineAction(data) {
		data = (typeof(data) == "string") ? JSON.parse(data):data;
		if(data && data.intent) {
			console.log(data);
			if(data.intent.toLowerCase() == "add") {
				return temp.get({"elementID": temp.add(data)});
			} else if(data.intent.toLowerCase() == "modify") {
				return temp.modify(data);
			}
		} 
	}

	var poll = function() {
		$.getJSON('./poll', function(res) {
			if(res && res.length > 0) {
				for(var i = 0; i < res.length; i++) {
					determineAction(res[i]);
				}
			}
			poll();
		});
	}

	poll();
});