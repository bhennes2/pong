Play = React.createClass({

  mixins: [KeyHandler, ReactMeteorData],

  getMeteorData() {

    const gameId = this.props.params.id;

    const handle  = Meteor.subscribe("gameData", gameId),
          game    = Games.findOne(gameId),
          players = Players.find({}).fetch();

    let data = {
      isReady: handle.ready()
    };

    if (handle.ready()) {
      data.game    =  game;
      data.player1 = players.find((player)=>{ return player._id === game.player1; });
      data.player2 = players.find((player)=>{ return player._id === game.player2; });
    }

    return data;
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

    if (this.data.isReady) {

      const game       = this.data.game,
            endMessage = game.inProgress ? '' : <EndGameMessage game={game} winner={this.winner()}/>;

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
          {endMessage}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
});
