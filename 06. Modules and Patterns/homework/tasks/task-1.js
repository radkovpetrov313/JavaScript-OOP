/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
  function validateTitle(title) {
      if (!title) {
        throw 'Presentations titles must have atleast one character!';
      }

      if ((title[0] === ' ') || (title[title.length - 1] === ' ')) {
        throw 'Presentations titles must not start or end with space!';
      }

      if (/[ ]{2,}/.test(title)) {
        throw 'Presentations titles must not have consecutive spaces!';
      }
  }

  function validateName(name) {
    if (!(/^[A-Z][a-z]*$/.test(name))) {
      throw 'Name must start with upper case letter and every oder (if any) must be lower case!';
    }
  }

  function validateIDs(id, arrID) {
    if ((id - 1) < 0 || id > arrID.length) {
        throw 'Invalid studentID!';
    }
  }

	var Course = {
		init: function(title, presentations) {
      validateTitle(title);
      this.title = title;

      if (!(Array.isArray(presentations))) {
        throw 'Presentations parameter must be an array!';
      }

      if (!presentations.length) {
        throw 'Presentations are missing!';
      }

      presentations.forEach(function(element) {
        validateTitle(element);
      });

      this.presentations = presentations;
      this.students = [];
      return this;
		},
		addStudent: function(name) {
      var student = {},
          separateNames = name.split(' ');

        if (separateNames.length != 2) {
          throw 'Student names must be 2!';
        }

        validateName(separateNames[0]);
        validateName(separateNames[1]);
          
        student.firstname = separateNames[0];
        student.lastname = separateNames[1];

        student.id = (this.students.length) + 1;
        student.homeworks = [];
        student.score = 0;
        student.topScore = 0;

        this.students.push(student);
        return student.id;
		},
		getAllStudents: function() {
      return this.students;
		},
		submitHomework: function(studentID, homeworkID) {

      validateIDs(studentID, this.students);

      validateIDs(homeworkID, this.presentations);

      this.students[studentID - 1].homeworks.push(homeworkID);
      return this;
		},
		pushExamResults: function(results) {
      var self = this;

      if (!(Array.isArray(results))) {
        throw 'Results parameter must be an array!';
      }

      results.forEach(function(element) {
        validateIDs(element.StudentID, self.students);

        element.score = +(element.score);
        if (isNaN(element.score)) {
          throw 'Exam score must be a number!';
        }

        if (self.students[element["StudentID"] - 1].score != 0) {
          throw 'Student is trying to cheat!';
        } else {
          self.students[element["StudentID"] - 1].score = element.score;
        }
      });

      return this;
		},
		getTopStudents: function() {
      var self = this,
          homeWorksScore = 0,
          examScore = 0,
          topStudents = [];

      self.students.forEach(function(element) {
          homeWorksScore = ((element.homeworks.length / self.presentations.length) * 100);
          element.topScore += ((homeWorksScore / 100) * 25);

         
          element.topScore += ((element.score / 100) * 75);
      });

      topStudents = self.students.sort(function(a, b) {
                      return b.topScore - a.topScore;
                    }).filter(function(element, index) {
                      return index < 10;
                    });

      return topStudents;
		}
	};

	return Course;
}


module.exports = solve;













