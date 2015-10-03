MainMenu = React.createClass({

  getInitialState: function() {
    return {
      links: [
        { title: 'Play',    target: '/game/new'},
        { title: 'Leaders', target: '/leaders'}
      ]
    };
  },

  render: function() {
    return (
      <div>
        <h1 className="game-name">
          <img src="/rocket.png" />PONG
        </h1>
        <Menu items={this.state.links} />
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    );
  }
});
