Meteor.publish("players", function() {
  return Players.find({});
});

Meteor.publish("games", function() {
  return Games.find({});
});

Meteor.publish("challenges", function() {
  return Challenges.find({}, { sort: { created_at: 1 } });
});

Meteor.publish("playersAlpha", function() {
  return Players.find({}, { sort: { name: 1 } });
});

Meteor.publish("onePlayer", function(playerId) {
  check(playerId, String);
  return Players.find(playerId);
});

Meteor.publish("playersWin", function() {
  return Players.find({}, { sort: { winPct: -1, losses: 1, wins: -1, name: 1 } });
});

Meteor.publish("gamesForPlayer", function(playerId) {
  check(playerId, String);
  return Games.find({$or: [{player1: playerId}, {player2: playerId}]}, { sort: {createdAt: -1 }});
});

Meteor.publish("gameData", function(gameId) {
  check(gameId, String);

  const game = Games.findOne(gameId);

  return [
    Games.find(gameId),
    Players.find({_id: { $in: [game.player1, game.player2] } })
  ];
});
