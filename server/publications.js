Meteor.publish("players", function() {
  return Players.find({});
});

Meteor.publish("games", function() {
  return Games.find({});
});

Meteor.publish("challenges", function() {
  return Challenges.find({});
});
