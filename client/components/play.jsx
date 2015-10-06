Play = React.createClass({

  mixins: [KeyHandler, ReactMeteorData],

  hold(keyCode) {},

  tap(keyCode) {

    let player1Score = this.data.game.player1Score;
    let player2Score = this.data.game.player2Score;

    if (this.isOver(player1Score, player2Score)) {
      return;
    }

    if (keyCode === 65) {
      Meteor.call("updateScore", this.data.game._id, ++player1Score, player2Score);
    } else {
      Meteor.call("updateScore", this.data.game._id, player1Score, ++player2Score);
    }


    // refactor
    if (this.isOver(player1Score, player2Score)) {
      let winner = player1Score > player2Score ? this.data.player1 : this.data.player2;
      Meteor.call("updateRecord", winner._id, winner.wins + 1, winner.losses);

      let loser = player1Score > player2Score ? this.data.player2 : this.data.player1;
      Meteor.call("updateRecord", loser._id, loser.wins, loser.losses + 1);

      Meteor.call("slackTaunt", winner, loser);
    }
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

  isOver(player1Score, player2Score) {
    var totalPoints = player1Score + player2Score;
    var pointDiff = Math.abs(player1Score - player2Score);

    return (player1Score > 20 || player2Score > 20) && pointDiff > 1;
  },

  winner() {
    let game = this.data.game;

    return game.player1Score > game.player2Score ? this.data.player1 : this.data.player2;
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

    let end = this.isOver(game.player1Score, game.player2Score) ? <EndGameMessage winner={this.winner()}/> : '';

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
