EndGameMessage = React.createClass({

  mixins: [ReactRouter.Navigation],

  propTypes: {
    winner: React.PropTypes.string.isRequired
  },

  onSelect(item) {
    if (item.action === "main") {
      this.transitionTo("/main");
    } else {
      Meteor.call("newGame", this.props.game.player1, this.props.game.player2, (_,gameId) => {
        this.transitionTo('/game/' + gameId);
      });
    }
  },

  render() {

    var menuItems = [
      { title: "Play Again", action: "new" },
      { title: "Main Menu", action: "main"}
    ];

    return (
      <div className="game-message">
        <p>{this.props.winner.name} Wins!</p>
        <p>{this.props.winner.taunt}</p>
        <Menu
          items={menuItems}
          listens={[KeyCode.Left, KeyCode.Right]}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
});
