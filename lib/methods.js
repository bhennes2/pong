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
  },

  slackTaunt(winner) {
    let url = "https://hooks.slack.com/services/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";
    let params = {
      content: JSON.stringify({
        channel: "#pong",
        username: "RocketPong",
        text: winner.taunt,
        icon_emoji: ":ghost:"
      })
    };
    HTTP.post(url, params, (error, result) => { if (error) { console.log(error); } });
  }

});

