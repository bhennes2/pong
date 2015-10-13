ServingMenu = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  getMeteorData() {

    const game = Games.findOne(this.props.params.id);

    return {
      game:    game,
      player1: Players.findOne(game.player1),
      player2: Players.findOne(game.player2)
    };
  },

  onSelect(item) {
    Meteor.call("setFirstServer", this.props.params.id, item.id);
    this.transitionTo('/game/' + this.props.params.id + '/play');
  },

  render() {

    var menuItems = [
      { title: this.data.player1.name, id: this.data.player1._id },
      { title: this.data.player2.name, id: this.data.player2._id }
    ];

    return (
      <div className="game-container">
        <div className="player-container left">
          <p className="player-name">{this.data.player1.name}</p>
          <h1 className="score">0</h1>
        </div>
        <div className="player-container right">
          <p className="player-name">{this.data.player2.name}</p>
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
