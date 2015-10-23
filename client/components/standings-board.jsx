StandingsBoard = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      players: Players.find({}, { sort: { winPct: -1, losses: 1, wins: -1, name: 1 } }).fetch()
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

  propTypes: {
    players: React.PropTypes.array.isRequired
  },

  render() {

    var formatPct = function(pct){
      var value = 0;
      if (pct && pct > -1){
        value = pct;
      }
      return value.toFixed(3);
    };

    var players = this.props.players.map(function(player, idx) {

      return (
        <tr key={player._id}>
          <td>{player.name}</td>
          <td>{player.wins}</td>
          <td>{player.losses}</td>
          <td>{player.wins + player.losses}</td>
          <td>{formatPct(player.winPct)}</td>
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
