const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
	task: { type: String }, isSelected: { type: Boolean }
},
{ collection: "tasks", strict: false });

module.exports = mongoose.model('Tasks', tasksSchema);

module.exports = {

	saveTasks: function (result) {
		const newTask = new Result(result.body);
		return newTask.save((err) => {
			if (err) {
				console.log(err);
			}
		});
	},

	getTasks: function (task) {
		return Tasks.find({}, function (err, result) {
			return result;
		});
	}
}

