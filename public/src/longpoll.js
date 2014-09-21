
var poll = function() {
	$.getJSON('./poll', function(response) {
		console.log(response);
		poll();
	})
}
poll();