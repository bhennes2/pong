ChoosePlayerMenu = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  selectPlayer1(item) {
    this.player1 = item.title;

    if (this.player1 && this.player2) {
      console.log('game time')
      gameId = Games.insert({player1: this.player1, player2: this.player2});
      this.transitionTo('/game/' + gameId);
    }
  },

  selectPlayer2(item) {
    this.player2 = item.title;

    if (this.player1 && this.player2) {
      console.log('game time')
      gameId = Games.insert({player1: this.player1, player2: this.player2});
      this.transitionTo('/game/' + gameId);
    }
  },

  unSelectPlayer1(item) {
    this.player1 = null;
  },

  unSelectPlayer2(item) {
    this.player2 = null;
  },

  getMeteorData() {

    return {
      players: Players.find({}).fetch()
    };
  },

  render() {

    var menuItems = this.data.players.map((player) => {
      return { title: player.name };
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
