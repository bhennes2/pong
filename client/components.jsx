var KeyHandler = {

  componentDidMount: function() {
    var currentKey = -1,
        time = -1;

    function handleKeyDown(event) {
      if (event.keyCode !== 65 && event.keyCode !== 66) {
        return;
      }

      if (currentKey === -1) {
        currentKey = event.keyCode;
        time = Date.now();
      }
    }

    function handleKeyUp(event) {
      if (event.keyCode !== 65 && event.keyCode !== 66) {
        return;
      }

      if (currentKey === event.keyCode) {
        if (Date.now() - time >= 500) {
          this.hold(event.keyCode);
        } else {
          this.tap(event.keyCode);
        }
        currentKey = -1;
        time = -1;
      }
    }

    window.addEventListener('keydown', handleKeyDown.bind(this));
    window.addEventListener('keyup', handleKeyUp.bind(this));
  }
};

var MenuHandler = {
  hold: function(keyCode) {
    this.transitionTo(this.state.links[this.state.selected]);
  },

  tap: function(keyCode) {
    var selected = (this.state.selected + 1) % this.state.links.length;
    this.setState({selected: selected});
  }
};

Navigation = ReactRouter.Navigation;

MenuItem = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'menu-item': true,
      'game-start': this.props.selected
    });
    return <p className={classes}>{this.props.title}</p>;
  }
});

MainMenu = React.createClass({
  mixins: [KeyHandler, MenuHandler, Navigation],

  getInitialState: function() {
    return {
      selected: 0,
      links: ['play', 'leaders']
    };
  },

  render: function() {
    var menuItems = this.state.links.map(function(link, idx) {
      var selected = (this.state.selected === idx);
      return <MenuItem title={link} selected={selected} />;
    }, this);

    return (
      <div>
        <h1 className="game-name">
          <img src="/rocket.png" />PONG
        </h1>
        {menuItems}
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    );
  }
});

Leaders = React.createClass({
  mixins: [KeyHandler, MenuHandler, Navigation],

  getInitialState: function() {
    return {
      selected: 0,
      links: ['main']
    };
  },

  render: function() {
    var menuItems = this.state.links.map(function(link, idx) {
      var selected = (this.state.selected === idx);
      return <MenuItem title={link} selected={selected} />;
    }, this);

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
        {menuItems}
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    );
  }
});

Play = React.createClass({
  mixins: [KeyHandler],

  hold: function(keyCode) {},

  tap: function(keyCode) {
    if (this.state.selected === -1 || this.state.end) {
      return;
    }

    var state = this.state;

    if (keyCode === 65) {
      state.player1 = state.player1 + 1;
    } else {
      state.player2 = state.player2 + 1;
    }

    var totalPoints = state.player1 + state.player2;
    var pointDiff = Math.abs(state.player1 - state.player2);

    if ( (state.player1 > 20 || state.player2 > 20) && pointDiff > 1) {
      state.end = true;
    } else {
      if (totalPoints % 5 === 0) {
        state.selected = (state.selected + 1) % 2
      }
    }

    this.setState(state);
  },

  selectPlayer: function(playerIdx) {
    this.setState({selected: playerIdx});
  },

  getInitialState: function() {
    return {
      player1: 0,
      player2: 0,
      selected: -1,
      end: false
    };
  },

  render: function() {
    var serving = this.state.selected === -1 ? <ServingMenu select={this.selectPlayer}/> : '';
    var winner = this.state.player1 > this.state.player2 ? '1' : '2';
    var end = this.state.end ? <EndGameMessage winner={"Player " + winner}/> : '';

    return (
      <div className="game-container">
        <div className="player-container left">
          <p className="player-name">Player 1</p>
          <h1 className="score">{this.state.player1}</h1>
          <ServingMessage show={this.state.selected === 0} />
        </div>
        <div className="player-container right">
          <p className="player-name">Player 2</p>
          <h1 className="score">{this.state.player2}</h1>
          <ServingMessage show={this.state.selected === 1} />
        </div>
        {serving}
        {end}
      </div>
    );
  }
});

ServingMenu = React.createClass({
  mixins: [KeyHandler],

  getInitialState: function() {
    return {
      selected: 0,
      players: ['Player 1', 'Player 2']
    };
  },

  hold: function(keyCode) {
    this.props.select(this.state.selected)
  },

  tap: function(keyCode) {
    var selected = (this.state.selected + 1) % this.state.players.length;
    this.setState({selected: selected});
  },

  render: function() {
    var menuItems = this.state.players.map(function(player, idx) {
      var selected = (this.state.selected === idx);
      return <MenuItem title={player} selected={selected} />;
    }, this);

    return (
      <div className="game-message">
        <p>Who serves first?</p>
        {menuItems}
      </div>
    );
  }
});

ServingMessage = React.createClass({
  render: function() {
    var classes = 'serving-message';
    if (!this.props.show){
      classes += ' hide';
    }
    return <span className={classes}>Serving</span>;
  }
});

EndGameMessage = React.createClass({
  mixins: [KeyHandler, MenuHandler, Navigation],

  getInitialState: function() {
    return {
      selected: 0,
      links: ['main']
    };
  },

  render: function() {
    return (
      <div className="game-message">
        <p>{this.props.winner} Wins!</p>
        <MenuItem title="New Game" selected={true} />
      </div>
    );
  }
});
