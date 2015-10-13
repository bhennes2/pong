if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var players = [
        { name: 'Dave',    wins: 0, losses: 5, winPct: 0, taunt: 'Muahahaha', email: 'dave@launchpadlab.com'},
        { name: 'Brendan', wins: 0, losses: 0, winPct: 0, taunt: 'Muahahaha', email: 'brendan@launchpadlab.com'},
        { name: 'Tom',     wins: 0, losses: 0, winPct: 0, taunt: 'Muahahaha', email: 'tom@launchpadlab.com'},
        { name: 'Scott',   wins: 0, losses: 0, winPct: 0, taunt: 'Muahahaha', email: 'scott@launchpadlab.com'},
        { name: 'Ryan',    wins: 0, losses: 0, winPct: 0, taunt: 'Muahahaha', email: 'ryan@launchpadlab.com'},
        { name: 'Monique', wins: 0, losses: 0, winPct: 0, taunt: 'Muahahaha', email: 'monique@launchpadlab.com'},
        { name: 'Paul',    wins: 0, losses: 0, winPct: 0, taunt: 'Muahahaha', email: 'paul@launchpadlab.com'},
        { name: 'Wade',    wins: 0, losses: 0, winPct: 0, taunt: 'Muahahaha', email: 'wade@launchpadlab.com'}
      ];

      var dbPlayers = [];

      players.forEach(function (player, i) {
        dbPlayers[i] = Players.insert(player);
      });

      Games.insert({
        player1: dbPlayers[0],
        player2: dbPlayers[1],
        player1Score: 15,
        player2Score: 21,
        firstServer: dbPlayers[1],
        inProgress: false,
        createdAt: new Date()
      });
    }
  });
}
