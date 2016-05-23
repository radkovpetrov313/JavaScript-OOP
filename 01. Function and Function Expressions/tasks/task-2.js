/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(start, end) {
	var result = [],
		i,
		devider,
		maxDevider
		isPrime = true;

	start = +(start);
	end = +(end);

	if (arguments.length < 2) {
		throw new Error('Argument is missing!');
	}

	if (isNaN(start) || isNaN(end)) {
		throw new Error('One of the arguments is not a number!');
	}


	if (start > end) {
		var temp = start;
		start = end;
		end = temp;
	}

	if (start < 2) {
		start = 2;
	}

	for (i = start; i <= end; i += 1) {
		isPrime = true;
		maxDevider = i;
		for (devider = 2, maxDevider = i; devider < maxDevider; devider += 1) {
			if (!(maxDevider % devider)) {
				isPrime = false;
			}
		}

		if (isPrime) {
			result.push(i);
		}
	}

	return result;
}

//console.log(findPrimes(0, 5))

module.exports = findPrimes;
