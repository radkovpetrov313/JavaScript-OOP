var domElement = (function () {

	function attributeContent(obj, attributeArray) {
		var result = '',
			attributes = attributeArray.filter(function(element) {
				return element.parent === obj;
			});

			if (attributes.length) {
				attributes.forEach(function(element) {
					result += ' ' + element.name + '="' + element.value + '"';
				});
			}

			return result;
	}

	function validateType(type) {
		if (!type) {
			throw 'Missing type!';
		}

		if (!(/^[A-Za-z0-9]+$/.test(type))) {
			throw 'Invalid type!';
		}
	}

	var domElement = {
		init: function(type) {
			this.type = type;
			this.children = [];
			this.attributes = [];
			return this;
		},
		appendChild: function(child) {
			if (typeof(child) === 'object') {
				child = child.innerHTML();
			}

			this.children.push(child);
			return this;
		},
		addAttribute: function(name, value) {
			var attribute = {};

			attribute.name = name;
			attribute.value = value;

			if (this.children.length) {
				attribute.parent = this.children[this.children.length - 1];
			} else {
				attribute.parent = this;
			}

			this.attributes.push(attribute);

			return this;
		},
		removeAttribute: function(attribute) {
		},
		innerHTML: function() {
			var result = '',
				childContent = '',
				self = this;

			result += '<' + self._type;

			if (attributeContent(self, self.attributes)) {
				result += attributeContent(self, self.attributes);
			}

			result += '>';

			if (this.children.length) {
				this.children.forEach(function(element) {
					var elementParts = element.split('>');

					if (attributeContent(element, self.attributes)) {
						elementParts[0] = elementParts[0] + attributeContent(element, self.attributes);
					}

					result += (elementParts.join('>'));	

				});
			}

			result += '</' + self._type + '>';

			return result;
		}
	};

	Object.defineProperties(domElement, {
		'type': {
			set: function(val) {
				validateType(val);

				this._type = val;
				return this;
			},
			get: function() {
				return this._type;
			}
		}
	});
	return domElement;
} ());

var el1 = Object.create(domElement).init('div'),
	el2 = Object.create(domElement).init('body').addAttribute('size', '1000px').addAttribute('style', 'itallic').appendChild(el1).addAttribute('size', '45px');

console.log(el2.innerHTML());
