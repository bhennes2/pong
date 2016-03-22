GuestServingMenu = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  getMeteorData() {
    const game    = { player1: 1, player2: 2 },
          players = [{ _id: 1, name: 'Player 1'}, { _id: 2, name: 'Player 2' }];

    return {
      game:    game,
      players: players
    };
  },

  onSelect(item) {
    this.transitionTo('/game_guest/play/' + item.player._id);
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
