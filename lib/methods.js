Meteor.methods({

  newGame(player1Id, player2Id) {
    return Games.insert({
      player1: player1Id,
      player2: player2Id,
      player1Score: 0,
      player2Score: 0,
      firstServer: null,
      createdAt: new Date()
    });
  },

  setFirstServer(gameId, firstServerId) {
    Games.update(gameId, { $set: { firstServer: firstServerId } });
  },

  updateScore(gameId, player1Score, player2Score) {
    Games.update(gameId, { $set: { player1Score: player1Score, player2Score: player2Score } });
  },

  updateRecord(playerId, wins, losses) {
    Players.update(playerId, { $set: { wins: wins, losses: losses } });
  }

});
