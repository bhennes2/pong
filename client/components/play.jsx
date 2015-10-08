Play = React.createClass({

  mixins: [KeyHandler, ReactMeteorData],

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

    let game = this.data.game;

    let totalScore = game.player1Score + game.player2Score;
    let modChanges = Math.floor(totalScore / 5) % 2;

    if (modChanges === 0) {
      return game.firstServer;
    } else {
      return game.firstServer === this.data.player1._id ? this.data.player2._id : this.data.player1._id;
    }
  },

  getMeteorData() {

    let game = Games.findOne(this.props.params.id);

    return {
      game:    game,
      player1: Players.findOne(game.player1),
      player2: Players.findOne(game.player2)
    };
  },

  render() {
    let game = this.data.game;
    let winner = game.winner ? game.winner === this.data.player1 ? this.data.player1.name : this.data.player2.name : '';
    let end = game.inProgress ? '' : <EndGameMessage winner={winner}/>;

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
  }
});
