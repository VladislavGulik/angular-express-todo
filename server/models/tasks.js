const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	isSelected: {
		type: Boolean,
		default: false,
	},
	description: {
		type: String,
	},
}, {
	collection: 'tasks',
	strict: false
});

const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = Tasks;

module.exports.saveTasks = function(task, cb) {
	debugger;
	console.log(task);
	return task.save((err) => {
		if (err) {
			debugger;
			console.log(err);
		} else {
			debugger;
			cb(null);
		}
	});
};

module.exports.getTasks = function () {
	return Tasks.find({}, function (err, task) {
		return task;
	});
};

module.exports.getTaskById = function (taskId) {
	return Tasks.findById(taskId, (err, task) => {
		if (err) {
			return err;
		} else {
			return task;
		}
	});
};

module.exports.updateTask = function (taskId, reqBody) {
	return Tasks.findByIdAndUpdate(taskId, reqBody, (err, task) => {
		if (err) {
			console.log(err);
		} else {
			return task;
		}
	}); 
};

module.exports.deleteTask = function(taskId) {
	return Tasks.findByIdAndRemove(taskId, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('DELETE: Ok');
		}
	});
};

