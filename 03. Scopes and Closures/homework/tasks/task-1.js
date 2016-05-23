/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [],
			categories = [],
			minSimbols = 2,
			maxSimbols = 100,
			iSBNSymbolsLenght = [10, 13];

		function isUnicCategory(categoryName) {
			var resultArr = [];

			if (!categoryName) {
				throw new Error('Category is missing!');
			}

			resultArr = categories.filter(function(category) {
				return category.name === categoryName;
			});

			return resultArr.length === 0;
		}

		function isUnic(arr, test_value, prop) {
			var resultArr = [];

			if (!test_value) {
				throw new Error("isUnique:: value is missing.");
			}

			resultArr = arr.filter(function(element) {
				return element[prop] === test_value;
			});

			return resultArr.length === 0;
		}

		function matchCriteria(val) {
			if (val.length < minSimbols) {
				throw new Error(val + ' size is too short! Must be bigger than ' + minSimbols + '!');
			}

			if (val.length > maxSimbols) {
				throw new Error(val + ' size is too big! Must be smaller than ' + maxSimbols + '!');
			}
		}

		function isValidISBN(isbn) {
			iSBNLength = isbn.length;

			return iSBNSymbolsLenght.indexOf(iSBNLength) > -1;
		}

		function validateBook(book) {
	

			//Validating Author:
			if (!book.author) {
				throw new Error('Author is missing!');
			}

			//Validating Title:
			if (!book.title) {
				throw new Error('Title is missing!');
			}

			matchCriteria(book.title);

			if (!isUnic(books, book.title, 'title')) {
				throw new Error('A book with that title is already added!');
			}

			//Validating Category:
			if (!book.category) {
				throw new Error('Category is missing!');
			}

			matchCriteria(book.category);

			if (isUnicCategory(book.category)) {
				var category = {};
				category.name = book.category;
				category.ID = (categories.length + 1);
				categories.push(category);
			}

			//Validating ISBN:
			if (!isUnic(books, book.isbn, 'isbn')) {
				throw new Error('A book with that ISBN is already added!');
			}

			if (!isValidISBN(book.isbn)) {
				throw new Error('Invalid ISBN!');
			}
		}
		
		function listBooks(filterObj) {
			var propObj = filterObj || {},
				prop = (Object.keys(propObj))[0];

			return books.filter(function(element) {
				return element[prop] === propObj[prop];
			});
		}

		function addBook(book) {
			
			validateBook(book);

			book.ID = books.length + 1;
			books.push(book);

			return book;
		}

		function listCategories() {
			return categories.map(function(category) {
				return category.name;
			});
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	}());

	return library;
}
module.exports = solve;