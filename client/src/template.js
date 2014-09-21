function Template() {
	this.elements = {};
	this.numbers = [];

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

	this.unselectAll = function() {
		_.forEach(this.getElementList(), function(el) {
			el.unselect();
		});
	}

	this.removeDisplayNumbers = function() {
		_.forEach(this.numbers, function(n) {
			n.remove();
		});
	}

	this.updateDisplayNumbers = function() {
		var that = this;
		this.removeDisplayNumbers(); // Remove previous numbers, inefficient... but still

		_.forEach(this.getElementList(), function(el) {
			if(jQuery.contains(document, el.get()[0])) {
				var node = $('<div></div>')
				.attr('class','number')
				.html(el.get()[0].attributes[0].value)
				.css('position', 'absolute')
				.css('top', parseInt(el.get().offset().top) - 10)
				.css('right', parseInt(el.get().offset().left) - 10)

				that.numbers.push(node);
				$('body').append(node);
			}
		});
	}

	// Actions made by the artist

	this.add = function(data) {
		var parent = (data && data.parent) ? this.getElementByID(data.parent):null;

		var el = that.addElement(data.type);
		el.applyStyles((data.styles) ? data.styles:[]);
		el.applyHTML((data.html) ? data.html:"");

		if(parent) {
			parent.get().append(el.get());
		} else {
			$('body').append(el.get());
		}

		this.updateDisplayNumbers();

		return el.getStaticID();
	}

	this.delete = function(data) {
		this.unselectAll();

		var el = this.getElementByID(data.elementID);
		if(el) {
			el.get().remove();
			this.updateDisplayNumbers();
			return true;
		} else {
			return false;
		}
	}

	this.modify = function(data) {
		this.unselectAll();

		var el = this.getElementByID(data.elementID);
		if(el) {
			el.applyStyles((data.styles) ? data.styles:[]);
			this.updateDisplayNumbers();
			return true;
		} else {
			return false;
		}
	}

	this.get = function(data) {
		this.unselectAll(); // Unselect everything before selecting again

		var returnArray = [];
		if(data && data.elementID) {
			var el = this.getElementByID(data.elementID);
			if(el) {
				el.select();
				returnArray.push(el.get()[0]);
			}
		} else {
			returnArray = _.map(this.getElementList(), function(el) {
				el.select();
				return (el) ? el.get()[0]:null;
			});
		}
		return returnArray;
	}
}