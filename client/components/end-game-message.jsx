EndGameMessage = React.createClass({

  getInitialState: function() {
    return {
      links: [
        { title: 'Play Again', target: '/game/new' },
        { title: 'Main Menu', target: '/main' }
      ]
    };
  },

  render: function() {
    return (
      <div className="game-message">
        <p>{this.props.winner} Wins!</p>
        <Menu items={this.state.links} />
      </div>
    );
  }
});
