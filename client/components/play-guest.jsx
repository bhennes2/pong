GuestPlay = React.createClass({

  mixins: [KeyHandler],

  componentWillMount() {

    const firstServer = parseInt(this.props.params.firstServer || "1"),
          game = { firstServer: firstServer, inProgress: true, player1: 1, player1Score: 0, player2Score: 0, player2: 2 };

    this.setState({
      game:    game,
      player1: { _id: 1, name: 'Player 1'},
      player2: { _id: 2, name: 'Player 2'}
    });
  },

  hold(keyCode) {},

  tap(keyCode) {

    if (!this.state.game.inProgress) {
      return;
    }

    const game = this.state.game;
    game.player1Score = game.player1Score + (keyCode === 65 ? 1 : 0);
    game.player2Score = game.player2Score + (keyCode === 65 ? 0 : 1);
    let pointDiff = Math.abs(game.player1Score - game.player2Score);
    game.inProgress = !((game.player1Score > 20 || game.player2Score > 20) && pointDiff > 1);
    if (!game.inProgress){
      game.winner = game.player1Score > game.player2Score ? this.state.player1.name : this.state.player2.name;
    }

    this.setState({
      game: game,
      player1: { _id: 1, name: 'Player 1'},
      player2: { _id: 2, name: 'Player 2'}
    });
  },

  winner() {
    return this.state.game.winner ? this.state.game.winner === this.state.player1._id ? this.data.player1 : this.state.player2 : '';
  },

  currentServer() {

    const game = this.state.game,
          totalScore = game.player1Score + game.player2Score,
          modChanges = Math.floor(totalScore / 5) % 2;

    if (modChanges === 0) {
      return game.firstServer;
    } else {
      return game.firstServer === this.state.player1._id ? this.state.player2._id : this.state.player1._id;
    }
  },

  render() {

    const game           = this.state.game,
          endGameMessage = (
            <EndGameMessage
              game={game}
              winner={this.winner()}
              player1={this.state.player1}
              player2={this.state.player2}
              guest={true} />
          );

    return (
      <div className="game-container">
        <div className="player-container left">
          <p className="player-name">{this.state.player1.name}</p>
          <h1 className="score">{game.player1Score}</h1>
          <ServingMessage show={this.currentServer() === this.state.player1._id} />
        </div>
        <div className="player-container right">
          <p className="player-name">{this.state.player2.name}</p>
          <h1 className="score">{game.player2Score}</h1>
          <ServingMessage show={this.currentServer() === this.state.player2._id} />
        </div>
        {game.inProgress ? '' : endGameMessage}
      </div>
    );
  }
});
