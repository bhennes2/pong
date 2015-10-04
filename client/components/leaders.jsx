Leaders = React.createClass({

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
        <Menu items={menuItems}/>
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    );
  }
});
