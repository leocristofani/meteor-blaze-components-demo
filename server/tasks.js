/**
 * Helper function to check if task belows to user
 * @param taskId
 * @returns {boolean}
 */
function taskBelongsToUser(taskId) {
	var task = Tasks.findOne(taskId);
	return (task.owner === Meteor.userId());
}

/**
 * Methods to manipulate tasks
 */
Meteor.methods({

	addTask: function (text) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('Permission Denied');
		}
		if (!text) {
			throw new Meteor.Error('Invalid Text');
		}

		var newTask = {
			text: text,
			isChecked: false,
			isPrivate: false,
			createdAt: new Date(),
			owner: Meteor.userId()
		};

		Tasks.insert(newTask);
	},

	removeTask: function (taskId) {
		if(taskBelongsToUser(taskId)) {
			Tasks.remove(taskId);
		}
	},

	setTaskChecked: function (taskId, setChecked) {
		if(taskBelongsToUser(taskId)) {
			Tasks.update(taskId, {$set: {isChecked: setChecked}});
		}
	},

	setTaskPrivate: function (taskId, setPrivate) {
		if(taskBelongsToUser(taskId)) {
			Tasks.update(taskId, {$set: {isPrivate: setPrivate}});
		}
	}

});

/**
 * Only public tasks that are public, or belong to the current user
 */
Meteor.publish('tasks', function () {
	return Tasks.find({
		$or: [
			{owner: this.userId},
			{isPrivate: {$ne: true}}
		]

	});
});