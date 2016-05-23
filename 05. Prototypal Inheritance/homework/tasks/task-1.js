/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
      * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * method removeAttribute(attribute)
    * throw Error if attribute does not exist in the domElement
*/


/* Example

var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)

var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);

console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/


function solve() {
	var domElement = (function () {

		function attributeContent(attributeArray) {
			var result = '';
				if (attributeArray.length) {
					attributeArray.forEach(function(element) {
						result += ' ' + element.name + '="' + element.value + '"';
					});
				}

				return result;
		}

		function validateType(type) {
			if (!type) {
				throw 'Missing type!';
			}

			if (typeof(type) != 'string') {
				throw 'Type property must be from type "string"!';
			}

			if (!(/^[A-Za-z0-9]+$/.test(type))) {
				throw 'Invalid type!';
			}
		}

		function validateChild(child) {
			if (typeof(child) != 'string' && typeof(child) != 'object') {
				throw 'Ivalid child!';
			}

			if (typeof(child) === 'object') {
				validateType(child.type);

				if (!child.innerHTML) {
					throw 'Invalid child!';
				}
			}
		}

		function validateAttribute(attribute) {
			if (!(attribute.name)) {
				throw 'Attribute name is missing!';
			}

			if (!(/^[A-Za-z0-9\-]+$/.test(attribute.name))) {
				throw 'Invalid Attribute Name!';
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
				validateChild(child);

				if (typeof(child) === 'object') {
					child.parent = this;
				}

				this.children.push(child);
				return this;
			},
			addAttribute: function(name, value) {
				var attribute = {},
					alreadyIn = false;

				attribute.name = name;
				attribute.value = value;

				validateAttribute(attribute);

				this.attributes.forEach(function(element) {
					if (element.name === attribute.name) {
						element.value = attribute.value;
						alreadyIn = true;
					}
				});

				if (!alreadyIn) {
					this.attributes.push(attribute);
				}

				alreadyIn = false;

				return this;
			},
			removeAttribute: function(attribute) {
				var index = -1,
					self = this;

				self.attributes.forEach(function(element, i) {
					if (element.name === attribute) {
						index = i;
					}
				});

				if (index != -1) {
					self.attributes.splice(index, 1);
				} else {
					throw 'Attribute not found!';
				}

				return this;
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
			},
			'content': {
				set: function(val) {
					if (typeof(val) != 'string') {
						throw '"Content" property must be a string!';
					}

					this._content = val;
					return this;
				},
				get: function() {
					return this._content;
				}
			},
			'innerHTML': {
				get: function() {
					var result = '',
					childContent = '',
					self = this;

					result += '<' + self._type;

					if (self.attributes.length) {
						self.attributes.sort(function(a, b) {
							return a.name > b.name;
						});

						result += attributeContent(self.attributes);
					}
					
					result += '>';

					if (self.children.length === 0 && self.content) {
						result += self.content;
					}

					if (self.children.length) {

						self.children.forEach(function(element) {
							if (typeof(element) === 'object') {
								result += element.innerHTML;
							} else {
								result += element;
							}

						});
					}

					result += '</' + self._type + '>';

					this._innerHTML = result;

					return this._innerHTML;
				}
			}
		});
		return domElement;
	} ());
	return domElement;
}

module.exports = solve;
