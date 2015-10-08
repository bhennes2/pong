PlayerDetail = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    let id = this.props.params.id;
    return {
      player: Players.findOne({ _id: id }),
      games: Games.find({ player1: id, player2: id }).fetch()
    };
  },

  render() {

    var player = this.data.player,
        Link = ReactRouter.Link;

    return (
      <div>
        <div className="row">
          <div className="eleven columns">
            <h4>{player.name}</h4>
            <p>{player.wins}-{player.losses}, 1st in LaunchPad Lab</p>
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
          <tbody>
            <tr>
              <td>Sat, Oct 3</td>
              <td>vs</td>
              <td>Cubs</td>
              <td>L</td>
              <td>1 - 0</td>
              <td>Final</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
