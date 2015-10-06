if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var players = [
        { name: 'Dave',    wins: 5, losses: 5, taunt: 'Muahahaha'},
        { name: 'Brendan', wins: 5, losses: 1, taunt: 'Muahahaha'},
        { name: 'Tom',     wins: 5, losses: 2, taunt: 'Muahahaha'},
        { name: 'Scott',   wins: 2, losses: 4, taunt: 'Muahahaha'},
        { name: 'Ryan',    wins: 4, losses: 3, taunt: 'Muahahaha'},
        { name: 'Monique', wins: 4, losses: 4, taunt: 'Muahahaha'},
        { name: 'Paul',    wins: 2, losses: 2, taunt: 'Muahahaha'},
        { name: 'Wade',    wins: 1, losses: 1, taunt: 'Muahahaha'}
      ];

      players.forEach(function (player) {
        Players.insert(player);
      });
    }
  });
}
