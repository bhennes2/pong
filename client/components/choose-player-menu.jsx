ChoosePlayerMenu = React.createClass({

  mixins: [ReactMeteorData],

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
          <p className="player-name">Player 1</p>
          <h1 className="score">0</h1>
        </div>
        <div className="player-container right">
          <p className="player-name">Player 2</p>
          <h1 className="score">0</h1>
        </div>
        <div className="game-message">
          <p>Who serves first?</p>
          <Menu items={menuItems}/>
        </div>
      </div>
    );
  }
});
