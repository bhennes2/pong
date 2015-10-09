Meteor.methods({

  slackTaunt(winnerId, loserId) {

    let slackSettings = Meteor.settings.private.slack;

    let SlackAPI = Meteor.npmRequire( 'node-slack' ),
        Slack    = new SlackAPI( slackSettings.hookUrl );

    let winner = Players.findOne(winnerId)
    let loser = Players.findOne(loserId)

    let text = winner.name + " just crushed " + loser.name + "!" + winner.taunt;

    Slack.send({
      channel:   slackSettings.defaults.channel,
      username:  slackSettings.defaults.username,
      text:       text,
      icon_emoji: slackSettings.defaults.icon_emoji
    });
  }
});


