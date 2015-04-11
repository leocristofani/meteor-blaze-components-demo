TaskListComponent = BlazeComponent.extendComponent({

	template: function () {
		return 'TaskListTemplate';
	},

	tasks: function () {

		var filterTo = Session.get('filterTo') || 'all',
			sortPredicates = {sort: {createdAt: -1}},
			ownerPrivatePredicates = {$or: [{owner: Meteor.userId()}, {isPrivate: {$ne: true}}]};

		var filterToMap = {
			all: function () {
				return Tasks.find(ownerPrivatePredicates, sortPredicates);
			},
			complete: function () {
				return Tasks.find({
					$and: [
						ownerPrivatePredicates,
						{isChecked: true}
					]
				}, sortPredicates);
			},
			incomplete: function () {
				return Tasks.find({
					$and: [
						ownerPrivatePredicates,
						{isChecked: false}
					]
				}, sortPredicates);
			}
		};

		return filterToMap[filterTo]();

	}

}).register('TaskListComponent');