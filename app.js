const express = require('express');
const app = express();



const db = require('./db').db;
const Student = require('./db').Student;
const Teacher = require('./db').Teacher;

let PORT = 8080;

app.get("/test", (req, res, next) => {
	// Visit http://localhost:8080/test to see the message!
	res.send("Hello GET Route!")
})
/*
 Your Route Code Here
*/
app.get('/students', function (req, res, next) {
	Student.findAll({})
		.then(function (students) {
			return students.map(function(student) {
				return student.name;
			});
		})
		.then(function(studentNames) {
			res.json(studentNames);
		})
		.catch(next);
});

app.get('/teachers', function (req, res, next) {
	Teacher.findAll({})
		.then(function(teachers) {
			return teachers.map(function(teacher) {
				return teacher.name;
			});
		})
		.then(function(teacherNames) {
			res.json(teacherNames);
		})
		.catch(next);
});

app.get('/students/:id', function(req, res, next) {
	let id = req.params.id;
	Student.findById(id)
		.then(function(student) {
			res.json(student.name);
		})
		.catch(next);
});

app.get('/teachers/:id', function(req, res, next) {
	let id = req.params.id;
	Teacher.findById(id)
		.then(function(teacher) {
			res.json(teacher.name);
		})
		.catch(next);
});

app.get('/teacher/:id', function(req, res, next) {
	let id = req.params.id;
	Student.findAll({
		where: {
			teacherId: id
		}
	})
	.then(function(students) {
		return students.map(function(student) {
			return student.name;
		});
	})
	.then(function(studentArr) {
		res.json(studentArr);
	})
	.catch(next);
});

app.delete('/remove/:name', function(req, res, next) {
	let studentToDelete = req.params.name;
	Student.destroy({
		where: {
			name: studentToDelete
		}
	})
	.then(function() {
		res.status(202).send();
	})
	.catch(next);
});

app.post('/update/:student', function(req, res, next) {
	let student = req.params.student;
	Student.update(
			{ teacherId: 1 },
			{ where: { name: student }}
	)
	.then(function() {
		res.status(204).send();
	})
	.catch(next);
});


app.use(function (err, req, res, next) {
	res.send(err.message);
});



db.sync(
	// {force: true}
)
	.then(() => {
		console.log('db synced');
		app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
	});
