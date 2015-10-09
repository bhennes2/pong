Meteor.methods({

  newGame(player1Id, player2Id) {
    return Games.insert({
      player1:      player1Id,
      player2:      player2Id,
      player1Score: 0,
      player2Score: 0,
      inProgress:   true,
      firstServer:  null,
      winner:       null,
      createdAt:    new Date()
    });
  },

  setFirstServer(gameId, firstServerId) {
    Games.update(gameId, { $set: { firstServer: firstServerId } });
  },

  updateScore(game, player1Score, player2Score) {
    Games.update(game._id, { $set: { player1Score: player1Score, player2Score: player2Score } });
  },

  gameEnded(game, player1Score, player2Score, winnerId) {
    Games.update(game._id, { $set: {
      player1Score: player1Score,
      player2Score: player2Score,
      inProgress: false,
      winner: winnerId
    } });
  },

  playerWon(playerId) {
    Players.update(playerId, { $inc: { wins: 1 } });
  },

  playerLost(playerId) {
    Players.update(playerId, { $inc: { losses: 1 } });
  },

  updateGame(game, player1Score, player2Score) {

    if (!game.inProgress) {
      return;
    }

    let totalPoints = player1Score + player2Score;
    let pointDiff = Math.abs(player1Score - player2Score);

    let isOver = (player1Score > 20 || player2Score > 20) && pointDiff > 1;

    if (!isOver) {
      Meteor.call("updateScore", game, player1Score, player2Score);
    } else {
      let winnerId = player1Score > game.player2Score ? game.player1 : game.player2;
      let loserId  = player1Score > game.player2Score ? game.player2 : game.player1;

      Meteor.call("gameEnded", game, player1Score, player2Score, winnerId);
      Meteor.call("playerWon", winnerId);
      Meteor.call("playerLost", loserId);

      Meteor.call("slackTaunt", game, winnerId, loserId);
    }
  }
});

