ServingMenu = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  getMeteorData() {

    const gameId = this.props.params.id,
          handle = Meteor.subscribe("gameData", gameId);

    return {
      isReady: handle.ready(),
      game:    Games.findOne(gameId),
      players: Players.find({}).fetch()
    };
  },

  onSelect(item) {
    Meteor.call("setFirstServer", this.props.params.id, item.id);
    this.transitionTo('/game/' + this.props.params.id + '/play');
  },

  player1() {
    return this.data.players.find((player)=>{ return player._id === this.data.game.player1; });
  },

  player2() {
    return this.data.players.find((player)=>{ return player._id === this.data.game.player2; });
  },

  render() {

    let menuItems = [],
        player1   = {},
        player2   = {};

    if (this.data.isReady) {
      menuItems = this.data.players.map((player)=>{
        return { title: player.name, id: player._id };
      });

      player1 = this.player1();
      player2 = this.player2();
    }

    return (
      <div className="game-container">
        <div className="player-container left">
          <p className="player-name">{player1.name}</p>
          <h1 className="score">0</h1>
        </div>
        <div className="player-container right">
          <p className="player-name">{player2.name}</p>
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
