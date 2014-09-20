$(document).ready(function() {

	// Initialize template
	var temp = new Template(), body = $('body');

	var firstInput = {
		"action": "ADD",
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
		"action": "ADD",
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

	// Test adding
	console.log(determineAction(firstInput));
	console.log(determineAction(secondInput));

	function determineAction(data) {
		if(data && data.action.toLowerCase() == "add") {
			return temp.get({"elementID": temp.add(data)});
		}
	}

});