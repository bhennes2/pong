if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var players = [
        { name: 'Dave',    wins: 2, losses: 0, taunt: 'Muahahaha', email: 'dave@launchpadlab.com'},
        { name: 'Ryan',    wins: 0, losses: 2, taunt: 'Muahahaha', email: 'ryan@launchpadlab.com'},
        { name: 'Brendan', wins: 0, losses: 0, taunt: 'Muahahaha', email: 'brendan@launchpadlab.com'},
        { name: 'Tom',     wins: 0, losses: 0, taunt: 'Muahahaha', email: 'tom@launchpadlab.com'},
        { name: 'Scott',   wins: 0, losses: 0, taunt: 'Muahahaha', email: 'scott@launchpadlab.com'},
        { name: 'Monique', wins: 0, losses: 0, taunt: 'Muahahaha', email: 'monique@launchpadlab.com'},
        { name: 'Paul',    wins: 0, losses: 0, taunt: 'Muahahaha', email: 'paul@launchpadlab.com'},
        { name: 'Wade',    wins: 0, losses: 0, taunt: 'Muahahaha', email: 'wade@launchpadlab.com'}
      ];

      var dbPlayers = [];

      players.forEach(function (player, i) {
        dbPlayers[i] = Players.insert(player);
      });

      Games.insert({
        player1: dbPlayers[0],
        player2: dbPlayers[1],
        player1Score: 21,
        player2Score: 18,
        firstServer: dbPlayers[1],
        inProgress: false,
        createdAt: new Date(2015, 9, 12, 11)
      });

      Games.insert({
        player1: dbPlayers[0],
        player2: dbPlayers[1],
        player1Score: 21,
        player2Score: 15,
        firstServer: dbPlayers[1],
        inProgress: false,
        createdAt: new Date(2015, 9, 11, 30)
      });
    }
  });
}
