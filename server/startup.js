if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var players = [
        { name: 'Dave',    wins: 5, losses: 5, taunt: 'Muahahaha', email: 'dave@launchpadlab.com'},
        { name: 'Brendan', wins: 5, losses: 1, taunt: 'Muahahaha', email: 'brendan@launchpadlab.com'},
        { name: 'Tom',     wins: 5, losses: 2, taunt: 'Muahahaha', email: 'tom@launchpadlab.com'},
        { name: 'Scott',   wins: 2, losses: 4, taunt: 'Muahahaha', email: 'scott@launchpadlab.com'},
        { name: 'Ryan',    wins: 4, losses: 3, taunt: 'Muahahaha', email: 'ryan@launchpadlab.com'},
        { name: 'Monique', wins: 4, losses: 4, taunt: 'Muahahaha', email: 'monique@launchpadlab.com'},
        { name: 'Paul',    wins: 2, losses: 2, taunt: 'Muahahaha', email: 'paul@launchpadlab.com'},
        { name: 'Wade',    wins: 1, losses: 1, taunt: 'Muahahaha', email: 'wade@launchpadlab.com'}
      ];

      players.forEach(function (player) {
        Players.insert(player);
      });
    }
  });
}
