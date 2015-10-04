ServingMenu = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  getMeteorData() {

    return {
      game: Games.findOne(this.props.params.id)
    };
  },

  onSelect(item) {
    this.transitionTo('/game/' + this.props.params.id + '/play', item.query);
  },

  render() {

    var menuItems = [
      { title: this.data.game.player1, query: {server: 0} },
      { title: this.data.game.player2, query: {server: 1} }
    ];

    return (
      <div className="game-container">
        <div className="player-container left">
          <p className="player-name">{this.data.game.player1}</p>
          <h1 className="score">0</h1>
        </div>
        <div className="player-container right">
          <p className="player-name">{this.data.game.player2}</p>
          <h1 className="score">0</h1>
        </div>
        <div className="game-message">
          <p>Who serves first?</p>
          <Menu
            items={menuItems}
            listens={[KeyCode.Left, KeyCode.Right]}
            onSelect={this.onSelect}
          />
        </div>
      </div>
    );
  }
});
