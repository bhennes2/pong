PlayerDetail = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    let id = this.props.params.id;
    return {
      players: Players.find({}).fetch(),
      player: Players.findOne(id),
      games: Games.find({$or: [{player1: id}, {player2: id}]}, { sort: {createdAt: -1 }}).fetch()
    };
  },

  getOrdinal(player) {
    var players = this.data.players,
        n = 1;

    for (var i=0; i < players.length; i++){
      if (players[i]._id === player._id){
        n += i;
      }
    }
    var s = ["th","st","nd","rd"],
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

    let player = this.data.player;

    if (player) {
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

  formatDate(dateStr){
    var date = new Date(dateStr),
        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return [dayNames[date.getDay()], ",", monthNames[date.getMonth()], " ", date.getDate()].join('');
  },

  opponent(game){
    var player = this.props.player;
    var opponentId = (game.player1 === player._id) ? game.player2 : game.player1;
    return this.props.players.filter((p) => {
      return p._id === opponentId;
    })[0];
  },

  outcome(game){
    var player = this.props.player;

    if (game.player1 === player._id){
      var opponentScoreKey = "player2Score",
          playerScoreKey = "player1Score";
    } else {
      var opponentScoreKey = "player1Score",
          playerScoreKey = "player2Score";
    }

    return (game[playerScoreKey] > game[opponentScoreKey]) ? "W" : "L";
  },

  gameComplete(game){
    var scoreDelta = Math.abs(game.player1Score - game.player2Score);
    return (scoreDelta >= 2 && (game.player1Score >= 21 || game.player2Score >= 21)) ? "Final" : "Live";
  },

  render(){

    var games = this.props.games.map((game) => {
      return (
        <tr>
          <td>{this.formatDate(game.createdAt)}</td>
          <td>vs</td>
          <td>{this.opponent(game).name}</td>
          <td>{this.outcome(game)}</td>
          <td>{game.player1Score} - {game.player2Score}</td>
          <td>{this.gameComplete(game)}</td>
        </tr>
      );

    });

    return <tbody>{games}</tbody>;
  }

});
