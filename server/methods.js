Meteor.methods({

  createChallenge(challengerId, challengeeId) {
    check(challengerId, String);
    check(challengeeId, String);

    Challenges.insert({
      challengerId: challengerId,
      challengeeId: challengeeId,
      created_at: new Date()
    });
  },

  slackTaunt(gameId, winner, loser) {
    check(gameId, String);
    check(winner, Object);
    check(loser, Object);

    const game = Games.findOne(gameId);

    const slackSettings = Meteor.settings.private.slack,
          SlackAPI = Meteor.npmRequire( 'node-slack' ),
          Slack    = new SlackAPI( slackSettings.hookUrl ),
          scores = [game.player1Score, game.player2Score].sort((a,b)=>{return b-a;}),
          text = winner.name + " just crushed " + loser.name + " " + scores[0] + " - " + scores[1] + "!",
          title = winner.name + ' says';

    Slack.send({
      channel:   slackSettings.defaults.channel,
      username:  slackSettings.defaults.username,
      text:       text,
      icon_emoji: slackSettings.defaults.icon_emoji,
      attachments: [
        {
          fallback: "An error has occurred",
          color: 'good',
          fields: [
            { title: title, value: winner.taunt }
          ]
        }
      ]
    });
  }
});


