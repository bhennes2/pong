Meteor.methods({

  slackTaunt(game, winnerId, loserId) {
    check(game, Object);
    check(winnerId, String);
    check(loserId, String);

    const slackSettings = Meteor.settings.private.slack;

    const SlackAPI = Meteor.npmRequire( 'node-slack' ),
          Slack    = new SlackAPI( slackSettings.hookUrl );

    const winner = Players.findOne(winnerId)
    const loser = Players.findOne(loserId)

    const scores = [game.player1Score, game.player2Score].sort((a,b)=>{return b-a;});
    const text = winner.name + " just crushed " + loser.name + " " + scores[0] + " - " + scores[1] + "!";
    const title = winner.name + ' says';

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


