TaskInputComponent = BlazeComponent.extendComponent({

	template: function () {
		return 'TaskInputTemplate';
	},

	events: function () {
		return [{
			'submit .task-input': this.handleTaskInput
		}];
	},

	handleTaskInput: function (event) {
		var textField = event.target.text,
			text = textField.value;

		event.preventDefault();
		Meteor.call('addTask', text);
		textField.value = "";
	}

}).register('TaskInputComponent');