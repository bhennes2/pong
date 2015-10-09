Meteor.methods({

  slackTaunt(winnerId, loserId) {
    check(winnerId, String);
    check(loserId, String);

    let slackSettings = Meteor.settings.private.slack;

    let SlackAPI = Meteor.npmRequire( 'node-slack' ),
        Slack    = new SlackAPI( slackSettings.hookUrl );

    let winner = Players.findOne(winnerId)
    let loser = Players.findOne(loserId)

    let text = winner.name + " just crushed " + loser.name + "!";
    let title = winner.name + ' says';

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


