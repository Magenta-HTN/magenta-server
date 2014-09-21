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
			data = (data.toLowerCase() != "lorem ipsum") ? data:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum, odio bibendum eleifend blandit, ex eros convallis augue, scelerisque molestie orci tellus id quam. Proin facilisis neque ex, efficitur aliquet diam molestie ac. Vivamus feugiat lectus auctor, rutrum urna quis, tincidunt dolor. Quisque purus dolor, tempor placerat magna a, dignissim pellentesque ante. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vitae vestibulum sapien. Praesent nec neque a mauris vehicula euismod non id lacus. Donec sit amet magna fermentum, faucibus neque ac, porttitor risus. Donec tempus vitae ligula nec porttitor. Nam tincidunt maximus purus, sagittis vestibulum lorem accumsan in. Mauris at ex ligula. Nullam lorem justo, elementum sit amet tincidunt et, viverra quis diam. In ut nulla vitae massa elementum iaculis. In sagittis tincidunt metus et aliquet.";
			this.el.html(data);
		}
	}
}

// Global static ID reference
Element.globalStaticID = 1;
Element.prototype.getGlobalStaticID = function() {
	return (Element.globalStaticID++);
}

