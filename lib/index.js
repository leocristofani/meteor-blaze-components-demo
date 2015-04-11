/**
 * Create Mongo Collection
 * @type {Mongo.Collection}
 */
Tasks = new Mongo.Collection('tasks');

if(Meteor.isClient) {
	Meteor.startup(function() {
		Session.set('filterTo', 'all');
		Meteor.subscribe('tasks');
	});
}