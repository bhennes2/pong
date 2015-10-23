Play = React.createClass({

  mixins: [KeyHandler, ReactMeteorData],

  getMeteorData() {
    const game = Games.findOne(this.props.params.id);

    return {
      game:    game,
      player1: Players.findOne(game.player1),
      player2: Players.findOne(game.player2)
    };
  },

  hold(keyCode) {},

  tap(keyCode) {

    if (!this.data.game.inProgress) {
      return;
    }

    const player1Score = this.data.game.player1Score + (keyCode === 65 ? 1 : 0),
          player2Score = this.data.game.player2Score + (keyCode === 65 ? 0 : 1);

    Meteor.call("updateGame", this.data.game, player1Score, player2Score, this.data.player1, this.data.player2);
  },

  winner() {
    return this.data.game.winner ? this.data.game.winner === this.data.player1._id ? this.data.player1 : this.data.player2 : '';
  },

  currentServer() {

    const game = this.data.game,
          totalScore = game.player1Score + game.player2Score,
          modChanges = Math.floor(totalScore / 5) % 2;

    if (modChanges === 0) {
      return game.firstServer;
    } else {
      return game.firstServer === this.data.player1._id ? this.data.player2._id : this.data.player1._id;
    }
  },

  render() {

    const game           = this.data.game,
          endGameMessage = (
            <EndGameMessage
              game={game}
              winner={this.winner()}
              player1={this.data.player1}
              player2={this.data.player2} />
          );

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
        {game.inProgress ? '' : endGameMessage}
      </div>
    );
  }
});
