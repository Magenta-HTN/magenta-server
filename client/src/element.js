function Element(type) {
	this.el = $('<'+type+'></'+type+'>');
	this.staticID = this.getGlobalStaticID();
	this.el.attr('staticID', this.staticID);
	this.isSelected = false;

	// That for this
	var that = this;

	// Get the jQuery element
	this.get = function() {
		return that.el;
	}

	this.getStaticID = function() {
		return that.staticID;
	}

	this.select = function() {
		this.isSelected = true;
		this.el.addClass('magentaSelected');
	}

	this.unselect = function() {
		this.isSelected = false;
		this.el.removeClass('magentaSelected');
	}

	this.applyStyles = function(styles) {
		if(styles) {
			for(var i = 0; i < styles.length; i++) {
				this.el.css(styles[i].property, (styles[i].value) ? styles[i].value:"");
			}
		}
	}

	this.applyHTML = function(data) {
		if(data) {
			this.el.html(data);
		}
	}
}

// Global static ID reference
Element.globalStaticID = 1;
Element.prototype.getGlobalStaticID = function() {
	return (Element.globalStaticID++);
}

