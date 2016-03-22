EndGameMessage = React.createClass({

  mixins: [ReactRouter.Navigation],

  propTypes: {
    game:    React.PropTypes.object.isRequired,
    winner:  React.PropTypes.string.isRequired,
    player1: React.PropTypes.object.isRequired,
    player2: React.PropTypes.object.isRequired
  },

  onSelect(item) {
    if (item.action === "main") {
      this.transitionTo("/main");
    } else {

      const game = this.props.game,
            newFirstServer = game.firstServer === game.player1 ? game.player2 : game.player1;

      if (this.props.guest){
        this.transitionTo(`/game_guest/new`);
      } else {
        Meteor.call("playAgain", this.props.player1, this.props.player2, newFirstServer, (_,gameId) => {
          this.transitionTo(`/game/${gameId}/play`);
        });
      }
    }
  },

  render() {

    console.log(this.props);
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
