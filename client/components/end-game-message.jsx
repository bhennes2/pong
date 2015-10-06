EndGameMessage = React.createClass({

  mixins: [ReactRouter.Navigation],

  propTypes: {
    winner: React.PropTypes.string.isRequired
  },

  onSelect(item) {
    this.transitionTo(item.target);
  },

  render() {

    var menuItems = [
      { title: "Play Again", target: "/game/new" },
      { title: "Main Menu", target: "/main" }
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
