Play = React.createClass({

  mixins: [KeyHandler, ReactMeteorData],

  getMeteorData() {

    const gameId = this.props.params.id;

    const handle = Meteor.subscribe("gameData", gameId);

    return {
      isReady: handle.ready(),
      game:    Games.findOne(gameId),
      player1: Players.findOne(game.player1),
      player2: Players.findOne(game.player2)
    }
  },

  hold(keyCode) {},

  tap(keyCode) {

    let player1Score = this.data.game.player1Score;
    let player2Score = this.data.game.player2Score;

    if (!this.data.game.inProgress) {
      return;
    }

    if (keyCode === 65) {
      player1Score++;
    } else {
      player2Score++;
    }

    Meteor.call("updateGame", this.data.game, player1Score, player2Score);
  },

  currentServer() {

    const game = this.data.game;

    const totalScore = game.player1Score + game.player2Score;
    const modChanges = Math.floor(totalScore / 5) % 2;

    if (modChanges === 0) {
      return game.firstServer;
    } else {
      return game.firstServer === this.data.player1._id ? this.data.player2._id : this.data.player1._id;
    }
  },

  render() {

    if (this.data.isReady) {

      const game = this.data.game;
      const winner = game.winner ? game.winner === this.data.player1._id ? this.data.player1 : this.data.player2 : '';
      const end = game.inProgress ? '' : <EndGameMessage game={game} winner={winner}/>;

      return (
        <div className="game-container">
          <div className="player-container left">
            <p className="player-name">{this.data.player1.name}</p>
            <h1 className="score">{game.player1Score}</h1>
            <ServingMessage show={this.currentServer() === this.data.player1._id} />
          </div>
          <div className="player-container right">
            <p className="player-name">{this.data.player2.name}</p>
            <h1 className="score">{game.player2Score}</h1>
            <ServingMessage show={this.currentServer() === this.data.player2._id} />
          </div>
          {end}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
});
