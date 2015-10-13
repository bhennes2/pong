Meteor.publish("playersAlpha", function() {
  return Players.find({}, { sort: { name: 1 } });
});

Meteor.publish("playersWin", function() {
  return Players.find({}, { sort: { winPct: -1, losses: 1, wins: -1, name: 1 } });
});

Meteor.publish("games", function() {
  return Games.find({});
});

Meteor.publish("challenges", function() {
  return Challenges.find({}, { sort: { created_at: 1 } });
});

Meteor.publish("gameData", function(gameId) {
  check(gameId, String);

  const game = Games.findOne(gameId);

  return [
    game,
    Players.find({_id: { $in: [game.player1, game.player2] } })
  ];
});
