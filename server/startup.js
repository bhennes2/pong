if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = ['Dave', 'Brendan', 'Tom', 'Scott', 'Ryan', 'Monique', 'Paul', 'Wade'];
      names.forEach(function (name) {
        Players.insert({ name: name });
      });
    }
  });
}
