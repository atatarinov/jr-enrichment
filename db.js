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


module.exports = {db, Student, Teacher}
