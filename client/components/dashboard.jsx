Dashboard = React.createClass({

  render() {

    return (
      <div>
        <h4>Current Standings</h4><br/>
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
          <tbody>
            <tr>
              <td>Dave</td>
              <td>26</td>
              <td>4</td>
              <td>30</td>
              <td>0.870</td>
              <td>9-1</td>
              <td>W5</td>
              <td><a href="#">Details</a></td>
            </tr>
            <tr>
              <td>Brendan</td>
              <td>1</td>
              <td>15</td>
              <td>16</td>
              <td>0.0625</td>
              <td>0-10</td>
              <td>L10</td>
              <td><a href="#">Details</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
