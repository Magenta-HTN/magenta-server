function Template() {
	this.elements = {};

	// That for this
	var that = this;

	this.addElement = function(type) {
		var tmpEl = new Element(type);
		that.elements[tmpEl.getStaticID()] = tmpEl;

		//Return the latest element added
		return that.elements[tmpEl.getStaticID()];
	}

	this.getElementById = function(reqID) {
		return (reqID in that.elements) ? that.elements[reqID]:null;
	}

	this.getElementList = function() {
		return _.toArray(that.elements);
	}
}