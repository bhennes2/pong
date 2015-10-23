ServingMenu = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  getMeteorData() {
    const game    = Games.findOne(this.props.params.id),
          players = Players.find({_id: { $in: [game.player1, game.player2] } }).fetch();

    return {
      game:    game,
      players: players
    };
  },

  onSelect(item) {
    Meteor.call("setFirstServer", this.data.game, item.player);
    this.transitionTo('/game/' + this.data.game._id + '/play');
  },

  player1() {
    return this.data.players.find((player)=>{ return player._id === this.data.game.player1; });
  },

  player2() {
    return this.data.players.find((player)=>{ return player._id === this.data.game.player2; });
  },

  render() {

    const menuItems = this.data.players.map(player=>{
            return { title: player.name, player: player };
          });

    return (
      <div className="game-container">
        <div className="player-container left">
          <p className="player-name">{this.player1().name}</p>
          <h1 className="score">0</h1>
        </div>
        <div className="player-container right">
          <p className="player-name">{this.player2().name}</p>
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
