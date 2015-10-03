ServingMenu = React.createClass({

  render: function() {

    var menuItems = [
      { title: "Player 1", target: "/game/1", query: {server: 0} },
      { title: "Player 2", target: "/game/1", query: {server: 1} }
    ];

    return (
      <div className="game-container">
        <div className="player-container left">
          <p className="player-name">Player 1</p>
          <h1 className="score">0</h1>
        </div>
        <div className="player-container right">
          <p className="player-name">Player 2</p>
          <h1 className="score">0</h1>
        </div>
        <div className="game-message">
          <p>Who serves first?</p>
          <Menu items={menuItems}/>
        </div>
      </div>
    );
  }
});
