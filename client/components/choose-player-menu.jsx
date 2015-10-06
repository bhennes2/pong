ChoosePlayerMenu = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  selectPlayer(player, id) {
    this[player + "Id"] = id;

    if (this.player1Id && this.player2Id) {
      Meteor.call("newGame", this.player1Id, this.player2Id, (_,gameId) => {
        this.transitionTo('/game/' + gameId);
      });
    }
  },

  selectPlayer1(item) {
    this.selectPlayer("player1", item.id);
  },

  selectPlayer2(item) {
    this.selectPlayer("player2", item.id);
  },

  unSelectPlayer1(item) {
    this.player1Id = null;
  },

  unSelectPlayer2(item) {
    this.player2Id = null;
  },

  getMeteorData() {

    return {
      players: Players.find({}).fetch()
    };
  },

  render() {

    let menuItems = this.data.players.map((player) => {
      return { title: player.name, id: player._id };
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
