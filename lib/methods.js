
function newGame(player1Id, player2Id) {
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
}

function winPct(wins, losses) {
  return wins/(wins + losses);
}

Meteor.methods({

  newGame(player1, player2) {
    check(player1, Object);
    check(player2, Object);

    return newGame(player1._id, player2._id);
  },

  newGameFromChallenge(challenge) {
    check(challenge, Object);

    Challenges.remove(challenge._id);

    return newGame(challenge.challengerId, challenge.challengeeId);
  },

  setFirstServer(gameId, firstServer) {
    check(game, Object);
    check(firstServer, Object);

    Games.update(game._id, { $set: { firstServer: firstServer._id } });
  },

  updateGame(game, player1Score, player2Score, player1, player2) {
    check(game, Object);
    check(player1Score, Number);
    check(player2Score, Number);
    check(player1, Object);
    check(player2, Object);

    if (!game.inProgress) {
      return;
    }

    let pointDiff = Math.abs(player1Score - player2Score);

    let isOver = (player1Score > 20 || player2Score > 20) && pointDiff > 1;

    const gameData = {
      inProgress:   !isOver,
      player1Score: player1Score,
      player2Score: player2Score,
      winner:       isOver ? player1Score > game.player2Score ? game.player1 : game.player2 : null
    };

    Games.update(game._id, { $set: gameData });

    if (isOver) {

      const winner = player1Score > player2Score ? player1 : player2;
      const loser  = player1Score > player2Score ? player2 : player1;

      Players.update(winner._id, { $set: { wins:   winner.wins + 1,  winPct: winPct(winner.wins + 1, winner.losses) } });
      Players.update(loser._id, {  $set: { losses: loser.losses + 1, winPct: winPct(loser.wins,      loser.losses + 1) } });

      Meteor.call("slackTaunt", game, winner, loser);
    }
  },

  updatePlayer(playerId, params) {
    check(playerId, String);
    check(params, Object);
    Players.update(playerId, { $set: params });
  }
});

