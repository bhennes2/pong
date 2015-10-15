PlayerDetail = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    const playerId = this.props.params.id,
          handle1 = Meteor.subscribe("playersWin"),
          handle2 = Meteor.subscribe("gamesForPlayer", playerId);

    return {
      isReady: handle1.ready() && handle2.ready(),
      players: Players.find({}).fetch(),
      player: Players.findOne(playerId),
      games: Games.find({}).fetch()
    };
  },

  getOrdinal(player) {
    const n = this.data.players.findIndex( (player) => { return player._id === this.data.player._id; } ) + 1,
          s = ["th","st","nd","rd"],
          v = n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
  },

  alert() {
    if (this.props.location.query){
      return (
        <Alert alertMessage={this.props.location.query.alertMessage} />
      );
    }
  },

  render() {

    let stuff = '';

    if (this.data.isReady) {

      const player = this.data.player;

      stuff = (
        <div>
          <div className="row">
            {this.alert()}
            <div className="eleven columns">
              <h4>{player.name}</h4>
              <p>{player.wins}-{player.losses}, {this.getOrdinal(player)} in LaunchPad Lab</p>
            </div>
            <div className="one column">
              <p><Link to={`/players/${player._id}/edit`}>Edit</Link></p>
            </div>
          </div>
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Date</th>
                <th></th>
                <th>Opponent</th>
                <th></th>
                <th>Score</th>
                <th></th>
              </tr>
            </thead>
            <PlayerGames
              players={this.data.players}
              player={player}
              games={this.data.games}
            />
          </table>
        </div>
      );
    }

    return <div>{stuff}</div>;
  }
});

PlayerGames = React.createClass({

  propTypes: {
    players: React.PropTypes.array.isRequired,
    player: React.PropTypes.object.isRequired,
    games: React.PropTypes.array.isRequired
  },

  formatDate(dateStr){
    return moment(dateStr).format('ddd, MMM Do');
  },

  opponent(game){
    var player = this.props.player;
    var opponentId = (game.player1 === player._id) ? game.player2 : game.player1;
    return this.props.players.filter((p) => {
      return p._id === opponentId;
    })[0];
  },

  render(){

    var games = this.props.games.map((game) => {
      return (
        <tr key={game._id}>
          <td>{this.formatDate(game.createdAt)}</td>
          <td>vs</td>
          <td>{this.opponent(game).name}</td>
          <td>{game.winner ? game.winner === this.props.player._id ? 'W' : 'L' : '-'}</td>
          <td>{game.player1Score} - {game.player2Score}</td>
          <td>{game.inProgress ? 'Live' : 'Final'}</td>
        </tr>
      );
    });

    return <tbody>{games}</tbody>;
  }

});
