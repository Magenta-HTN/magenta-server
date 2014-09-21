$(document).ready(function() {

	// Initialize template
	var temp = new Template(), body = $('body');

	$(window).resize(function() {
		temp.updateDisplayNumbers();
	});

	var firstInput = {
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
	}

	var secondInput = {
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
	}

	var thirdInput = {
		"intent": "ADD",
		"type": "p",
		"html": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum egestas odio at fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit sapien massa, ac rutrum dui congue in. Etiam in porttitor augue, pellentesque aliquet ex. Quisque varius commodo sem. Cras facilisis luctus maximus. In hac habitasse platea dictumst. Ut in rutrum neque. Mauris elit neque, tincidunt sit amet arcu scelerisque, imperdiet mattis tellus.",
		"styles": [
			{
				"property": "color",
				"value": "#4F0025"
			}
		],
		"parent": 1
	}

	// Test adding
	determineAction(firstInput);
	determineAction(secondInput);
	determineAction(thirdInput);

	function determineAction(data) {
		console.log(data);

		data = (typeof(data) == "string") ? JSON.parse(data):data;

		console.log('\nAFTER:');
		console.log(data);

		if(data && data.intent) {
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
				console.log(res);
				for(var i = 0; i < res.length; i++) {
					determineAction(res[i]);
				}
			}
			poll();
		});
	}

	poll();
});