const Sequelize = require('sequelize');


const db = new Sequelize('postgres://localhost/juniorenrichment', {
  logging: false
});


const Student = db.define('student', {
	/* STUDENT MODEL CODE HERE */
	name: {
		type: Sequelize.STRING
	},
	GPA: {
		type: Sequelize.INTEGER
	},
	teacherId: {
		type: Sequelize.INTEGER
	}

});

Student.prototype.getLetterGrade = function() {
	if (this.GPA === 4) {
		return 'A';
	} else if (this.GPA === 3) {
		return 'B';
	} else if (this.GPA === 2) {
		return 'C';
	} else if (this.GPA === 1) {
		return 'D';
	} else {
		return 'F';
	}
};

Student.getAllAStrudents = function() {
	Student.findAll({
		where: {
			GPA: 4
		}
	});
};


const Teacher = db.define('teacher', {
	/* TEACHER MODEL CODE HERE */
	name: {
		type: Sequelize.STRING
	},
	subject: {
		type: Sequelize.STRING
	}
});

Student.create({
	name: 'John',
	GPA: 3,
	teacherId: 1
});

Student.create({
	name: 'Molly',
	GPA: 4,
	teacherId: 1
});

Student.create({
	name: 'Bruce',
	GPA: 4,
	teacherId: 2
});

Student.create({
	name: 'Sally',
	GPA: 2,
	teacherId: 2
});

Teacher.create({
	name: 'Mrs. Smith',
	subject: 'Math'
});

Teacher.create({
	name: 'Mr. Perry',
	subject: 'Languages'
});



module.exports = {db, Student, Teacher};
