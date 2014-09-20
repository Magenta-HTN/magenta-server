function Element(type) {
	this.el = $('<'+type+'></'+type+'>');
	this.staticID = this.getGlobalStaticID();


	// That for this
	var that = this;

	// Get the jQuery element
	this.get = function() {
		return that.el;
	}

	this.getStaticID = function() {
		return that.staticID;
	}
}

// This is a global static id reference
Element.globalStaticID = 0;
Element.prototype.getGlobalStaticID = function() {
	return (Element.globalStaticID++);
}

