Leaders = React.createClass({

  getInitialState: function() {
    return {
      links: [{title: 'Main Menu', target: '/main'}]
    };
  },

  render: function() {
    return (
      <div>
        <h1 className="game-name">
          <img src="/rocket.png" />Leaders
        </h1>
        <ul>
          <li>Dave</li>
          <li>Ryan</li>
          <li>Brendan</li>
        </ul>
        <Menu items={this.state.links} />
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    );
  }
});
