Play = React.createClass({
  mixins: [KeyHandler],

  hold(keyCode) {},

  tap(keyCode) {
    if (this.state.end) {
      return;
    }

    var state = this.state;

    if (keyCode === 65) {
      state.player1 = state.player1 + 1;
    } else {
      state.player2 = state.player2 + 1;
    }

    var totalPoints = state.player1 + state.player2;
    var pointDiff = Math.abs(state.player1 - state.player2);

    if ( (state.player1 > 20 || state.player2 > 20) && pointDiff > 1) {
      state.end = true;
    } else {
      if (totalPoints % 5 === 0) {
        state.selected = (state.selected + 1) % 2
      }
    }

    this.setState(state);
  },

  componentDidMount() {
    this.setState({selected: Number(this.props.location.query.server)})
  },

  getInitialState() {

    return {
      player1: 0,
      player2: 0,
      selected: -1,
      end: false
    };
  },

  render() {

    var winner = this.state.player1 > this.state.player2 ? '1' : '2';
    var end = this.state.end ? <EndGameMessage winner={"Player " + winner}/> : '';

    return (
      <div className="game-container">
        <div className="player-container left">
          <p className="player-name">Player 1</p>
          <h1 className="score">{this.state.player1}</h1>
          <ServingMessage show={this.state.selected === 0} />
        </div>
        <div className="player-container right">
          <p className="player-name">Player 2</p>
          <h1 className="score">{this.state.player2}</h1>
          <ServingMessage show={this.state.selected === 1} />
        </div>
        {end}
      </div>
    );
  }
});
