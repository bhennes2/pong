StandingsBoard = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      players: Players.find({}, {sort: {wins: -1}}).fetch()
    };
  },

  render() {

    return (
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Name</th>
            <th>W</th>
            <th>L</th>
            <th>GP</th>
            <th>PCT</th>
            <th>L10</th>
            <th>STRK</th>
            <th></th>
          </tr>
        </thead>
        <StandingsBoard.Items
          players={this.data.players}
        />
      </table>
    );
  }
});

StandingsBoard.Items = React.createClass({

  totalGamesPlayed(player) {
    var items = [player.wins, player.losses];
    return items.reduce((a, b) => a + b);
  },

  winningPct(player) {
    var total = this.totalGamesPlayed(player),
        pct = "";
    if (total > 0){
      pct = (player.wins / total).toFixed(3);
    }
    return pct;
  },

  render() {

    var players = this.props.players.map(function(player, idx) {

      return (
        <tr>
          <td>{player.name}</td>
          <td>{player.wins}</td>
          <td>{player.losses}</td>
          <td>{this.totalGamesPlayed(player)}</td>
          <td>{this.winningPct(player)}</td>
          <td></td>
          <td></td>
          <td>
            <Link to={`/players/${player._id}`}>Details</Link>
          </td>
        </tr>
      );

    }, this);

    return <tbody>{players}</tbody>;
  }

});
