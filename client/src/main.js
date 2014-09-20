$(document).ready(function() {

	// Initialize template
	var temp = new Template(), body = $('body');

	var h2 = temp.addElement('h2');
	h2.get().html('Air');
	body.append(h2.get());

	// Example for TESTING

	var newel = temp.getElementByID(temp.add({
		"action": "ADD",
		"type": "button",
		"html": "Click Me",
		"styles": [
			{
				"property": "background",
				"value": "#111111"
			},{
				"property": "color",
				"value": "#FFF"
			},{
				"property": "padding",
				"value": "10px 20px"
			},{
				"property": "border",
				"value": "1px solid #444444"
			}
		],
		"parent": 0
	})).get();

	newel.click(function() {
		alert('I GET IT, I GET IT.');
	});


	console.log(temp.get({
		"intent": "GET",
		"elementID": 3
	}));

	console.log(temp.get());

});	