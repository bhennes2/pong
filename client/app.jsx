App = React.createClass({
  getInitialState: function() {
      return {};
  },
  render: function () {
    return (
      <div>
        <h1 class="game-name">
          <img src="/rocket.png" />PONG
        </h1>
        <div>
          {this.props.children}
        </div>
        <p class="menu-item">Leaders</p>
        <p class="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    );
  }
});
