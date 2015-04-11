TaskListItemComponent = BlazeComponent.extendComponent({

	template: function () {
		return 'TaskListItemTemplate';
	},

	events: function () {
		return [{
			'click .task-list-item-delete': this.handleDelete,
			'click .task-list-item-private-toggle': this.handlePrivateToggle,
			'click .task-list-item-checked-toggle': this.handleCheckedToggle

		}];
	},

	prettyCreatedAt: function() {
		return moment(this.data().createdAt).format('DD/MM/YYYY - hh:mm');
	},

	handleDelete: function () {
		var taskId = this.data()._id;
		Meteor.call('removeTask', taskId);
	},

	handlePrivateToggle: function () {
		var data = this.data(),
			isPrivate = data.isPrivate,
			taskId = data._id;

		Meteor.call('setTaskPrivate', taskId, !isPrivate);
	},

	handleCheckedToggle: function () {
		var data = this.data(),
			isChecked = data.isChecked,
			taskId = data._id;

		Meteor.call('setTaskChecked', taskId, !isChecked);
	}

}).register('TaskListItemComponent');