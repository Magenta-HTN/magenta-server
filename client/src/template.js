function Template() {
	this.elements = {};

	// That for this
	var that = this;

	// Type i.e.: h1, a, div, img
	this.addElement = function(type) {
		var tmpEl = new Element(type);
		that.elements[tmpEl.getStaticID()] = tmpEl;

		//Return the latest element added
		return that.elements[tmpEl.getStaticID()];
	}

	this.getElementByID = function(reqID) {
		return (reqID in that.elements) ? that.elements[reqID]:null;
	}

	this.getElementList = function() {
		return _.toArray(that.elements);
	}

	// Actions made by the artist

	this.add = function(data) {
		var parent = this.getElementByID(data.parent);

		var el = that.addElement(data.type);
		el.applyStyles((data.styles) ? data.styles:[]);
		el.applyHTML((data.html) ? data.html:"");

		if(parent) {
			parent.get().append(el.get());
		} else {
			$('body').append(el.get());
		}

		return el.getStaticID();
	}

	this.delete = function(data) {
		var el = this.getElementByID(data.elementID);
		if(el) {
			el.get().remove();
			return true;
		} else {
			return false;
		}
	}

	this.modify = function(data) {
		var el = this.getElementByID(data.elementID);
		if(el) {
			el.applyStyles((data.styles) ? data.styles:[]);
			return true;
		} else {
			return false;
		}
	}

	this.get = function(data) {
		return this.getElementByID(data.elementID);
	}
}