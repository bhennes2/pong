ChoosePlayerMenu = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  getMeteorData() {
    return {
      players: Players.find({}, { sort: { name: 1 } }).fetch()
    };
  },

  selectPlayer(player1OrPlayer2, player) {
    this[player1OrPlayer2] = player;

    if (this.player1 && this.player2) {
      Meteor.call("newGame", this.player1, this.player2, (_,gameId) => {
        this.transitionTo(`/game/${gameId}`);
      });
    }
  },

  selectPlayer1(item) {
    this.selectPlayer("player1", item.player);
  },

  selectPlayer2(item) {
    this.selectPlayer("player2", item.player);
  },

  unSelectPlayer1(item) {
    this.player1 = null;
  },

  unSelectPlayer2(item) {
    this.player2 = null;
  },

  render() {

    let menuItems = []

    menuItems = this.data.players.map((player) => {
      return { title: player.name, player: player };
    });

    return (
      <div className="game-container">
        <div className="player-container left">
          <p className="player-name">Choose Player</p>
          <Menu
            items={menuItems}
            listens={[KeyCode.Left]}
            onSelect={this.selectPlayer1}
            onUnSelect={this.unSelectPlayer1}
          />
        </div>
        <div className="player-container right">
          <p className="player-name">Choose Player</p>
          <Menu
            items={menuItems}
            listens={[KeyCode.Right]}
            onSelect={this.selectPlayer2}
            onUnSelect={this.unSelectPlayer2}
          />
        </div>
      </div>
    );
  }
});
