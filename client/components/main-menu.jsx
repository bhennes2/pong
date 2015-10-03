MainMenu = React.createClass({

  render: function() {

    var menuItems = [
      { title: "Play", target: "/game/new" },
      { title: "Leaders", target: "/leaders" }
    ];

    return (
      <div>
        <h1 className="game-name">
          <img src="/rocket.png" />PONG
        </h1>
        <Menu items={menuItems}/>
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    );
  }
});
