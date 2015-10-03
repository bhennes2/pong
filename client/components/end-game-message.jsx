EndGameMessage = React.createClass({

  propTypes: {
    winner: React.PropTypes.string
  },

  render: function() {

    var menuItems = [
      { title: "Play Again", target: "/game/new" },
      { title: "Main Menu", target: "/main" }
    ];

    return (
      <div className="game-message">
        <p>{this.props.winner} Wins!</p>
        <Menu items={menuItems}/>
      </div>
    );
  }
});
