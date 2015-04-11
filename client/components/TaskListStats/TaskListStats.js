TaskListStatsComponent = BlazeComponent.extendComponent({

	template: function () {
		return 'TaskListStatsTemplate'
	},

	events: function() {
		return [{
			'change [name=filter]': this.filterTo
		}];
	},

	completeCount: function() {
		return Tasks.find({isChecked: true}).count();
	},

	incompleteCount: function() {
		return Tasks.find({isChecked: false}).count();
	},

	allCount: function() {
		return Tasks.find().count();
	},

	filterTo: function(event) {
		Session.set('filterTo', event.target.value);
	}

}).register('TaskListStatsComponent');