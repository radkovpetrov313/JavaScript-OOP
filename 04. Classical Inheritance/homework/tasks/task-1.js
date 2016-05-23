/* Task Description */
/* 
	Create a function constructor for Person. Each Person must have:
	*	properties `firstname`, `lastname` and `age`
		*	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
		*	age must always be a number in the range 0 150
			*	the setter of age can receive a convertible-to-number value
		*	if any of the above is not met, throw Error 		
	*	property `fullname`
		*	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
		*	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
			*	it must parse it and set `firstname` and `lastname`
	*	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
	*	all methods and properties must be attached to the prototype of the Person
	*	all methods and property setters must return this, if they are not supposed to return other value
		*	enables method-chaining
*/
function solve() {
	var Person = (function () {
		function Person(firstname, lastname, age) {
			this.firstname = firstname;
			this.lastname = lastname;
			this.age = age;
			this.fullname = firstname + ' ' + lastname;
		}

		function validateName(name) {

			if (!(/^[A-Za-z]{3,20}$/.test(name))) {
				 throw new Error('Invalid Name!');
			}
		}

		function validateAge(age) {
			if (typeof(age) != 'number') {
				throw new Error('Input "Age" is not a number!');
			}

			if (age < 0 || age > 150) {
				throw new Error('Invalid "Age" size!');
			}
		}

		Object.defineProperties(Person.prototype, {
			'firstname': {
				set: function(val) {
					validateName(val);
						
					this._firstname = val;
					return this;					
				},
				get: function() {
					return this._firstname;
				}
			},
			'lastname': {
				set: function(val) {
					validateName(val);
						
					this._lastname = val;
					return this;					
				},
				get: function() {
					return this._lastname;
				}
			},
			'age': {
				set: function(val) {
					var number = +(val)
					validateAge(number);

					this._age = number;
					return this;
				},
				get: function() {
					return this._age;
				}
			},
			'fullname': {
				set: function(fullname) {	
					var splitNames;
					splitNames = fullname.split(' ');
					
					splitNames.forEach(function(element) {
						validateName(element);
					});

					this._firstname = splitNames[0];
					this._lastname = splitNames[1];

					this._fullname = fullname;
					return this;
				},
				get: function() {
					return this._fullname;
				}
			}
		});

		Person.prototype.introduce = function() {
			return 'Hello! My name is ' + this._fullname + ' and I am ' + this.age + '-years-old';
		};

		return Person;
	}());
	return Person;
}
module.exports = solve;