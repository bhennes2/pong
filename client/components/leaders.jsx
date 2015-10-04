Leaders = React.createClass({

  mixins: [ReactRouter.Navigation],

  onSelect(item) {
    this.transitionTo(item.target);
  },

  render() {

    var menuItems = [
      { title: "Main Menu", target: "/main" }
    ];

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
        <Menu
          items={menuItems}
          listens={[KeyCode.Left, KeyCode.Right]}
          onSelect={this.onSelect}
        />
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    );
  }
});
