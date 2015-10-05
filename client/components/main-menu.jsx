MainMenu = React.createClass({

  mixins: [ReactRouter.Navigation],

  onSelect(item) {
    this.transitionTo(item.target);
  },

  render() {

    var menuItems = [
      { title: "Play", target: "/game/new" },
      { title: "Leaders", target: "/leaders" }
    ];

    return (
      <div>
        <h1 className="game-name">
          <img src="/rocket.png" />PONG
        </h1>
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
