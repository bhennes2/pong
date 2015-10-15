StandingsBoard = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    const handle = Meteor.subscribe("playersWin");

    return {
      isReady: handle.ready(),
      players: Players.find({}).fetch()
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

    var players = this.props.players.map(function(player, idx) {

      return (
        <tr key={player._id}>
          <td>{player.name}</td>
          <td>{player.wins}</td>
          <td>{player.losses}</td>
          <td>{player.wins + player.losses}</td>
          <td>{player.winPct === -1 ? 0 : player.winPct}</td>
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
