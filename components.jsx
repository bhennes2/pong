var PlayGameLink = ReactMeteor.createClass({
  templateName: "PlayGameLink",
  render: function() {
    return <p className="menu-item game-start"><a href="/play_game">Play</a></p>;
  }
});

var ServingMessage = ReactMeteor.createClass({
  templateName: "ServingMessage",
  render: function() {
    var classes = 'serving-message';
    if (this.props.show === "false"){
      classes += ' hide';
    }
    return <span className={classes}>Serving</span>;
  }
});

var Game = ReactMeteor.createClass({
  templateName: "Game",
  render: function(){
    return (
      <div className="game-container">
        <div className="player-container left">
          <p className="player-name">Player 1</p>
          <h1 className="score">0</h1>
          <ServingMessage show="false" />
        </div>
        <div className="player-container right">
          <p className="player-name">Player 2</p>
          <h1 className="score">0</h1>
          <ServingMessage show="false" />
        </div>
        <div className="game-message">
          <p>Who serves first?</p>
        </div>
      </div>
    );
  }
});


