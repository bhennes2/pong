MainMenu = React.createClass({

  mixins: [ReactRouter.Navigation],

  onSelect(item) {
    if (item.action === 'challenge') {

      Meteor.call("newGameFromChallenge", item.challenge, (_,gameId) => {
        this.transitionTo('/game/' + gameId);
      });

    } else {
      this.transitionTo(item.target);
    }
  },

  render() {

    var menuItems = [
      { title: "Play",    action: 'play',    target: "/game/new" },
      { title: "Leaders", action: 'leaders', target: "/leaders" }
    ];

    const challenge = this.props.store.challenges && this.props.store.challenges[0];
    if (challenge) {

      menuItems.push({
        title:     "Challenge!!",
        action:    'challenge',
        challenge: challenge
      });
    }

    return (
      <div>
        <h1 className="game-name">
          <img src="/rocket.png" />PONG
        </h1>
        <Menu
          items={menuItems}
          listens={[KeyCode.Left, KeyCode.Right]}
          onSelect={this.onSelect}
        />
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    );
  }
});
