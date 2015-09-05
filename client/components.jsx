Navigation = ReactRouter.Navigation;

var KeyHandler = {

  componentDidMount: function() {
    var currentKey = -1,
        time = -1;

    var myHandleKeyDown = function handleKeyDown(event) {
      if (event.keyCode !== 65 && event.keyCode !== 66) {
        return;
      }

      if (currentKey === -1) {
        currentKey = event.keyCode;
        time = Date.now();
      }
    }.bind(this);

    var myHandleKeyUp = function handleKeyUp(event) {
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
    }.bind(this);

    window.addEventListener('keydown', myHandleKeyDown);
    window.addEventListener('keyup', myHandleKeyUp);

    this.setState({
      handleKeyDown: myHandleKeyDown,
      handleKeyUp: myHandleKeyUp
    });
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.state.handleKeyDown);
    window.removeEventListener('keyup', this.state.handleKeyUp);
  }
};

Menu = React.createClass({
  mixins: [KeyHandler, Navigation],

  hold: function(keyCode) {
    var item = this.props.items[this.state.selected];
    this.transitionTo(item.target, item.query);
  },

  tap: function(keyCode) {
    var selected = (this.state.selected + 1) % this.props.items.length;
    this.setState({selected: selected});
  },

  getInitialState: function() {
    return { selected: 0 };
  },

  render: function() {
    var menuItems = this.props.items.map(function(item, idx) {
      var selected = (this.state.selected === idx);
      return <MenuItem title={item.title} selected={selected} />;
    }, this);

    return <div>{menuItems}</div>;
  }
});

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

Play = React.createClass({
  mixins: [KeyHandler],

  hold: function(keyCode) {},

  tap: function(keyCode) {
    if (this.state.end) {
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

  componentDidMount: function() {
    this.setState({selected: Number(this.props.location.query.server)})
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
        {end}
      </div>
    );
  }
});

ServingMenu = React.createClass({

  getInitialState: function() {
    return {
      links: [
        { title: 'Player 1', target: '/game/1', query: { server: 0} },
        { title: 'Player 2', target: '/game/1', query: { server: 1} }
      ]
    };
  },

  render: function() {
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
          <Menu items={this.state.links} />
        </div>
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

  getInitialState: function() {
    return {
      links: [
        { title: 'Play Again', target: '/game/new' },
        { title: 'Main Menu', target: '/main' }
      ]
    };
  },

  render: function() {
    return (
      <div className="game-message">
        <p>{this.props.winner} Wins!</p>
        <Menu items={this.state.links} />
      </div>
    );
  }
});
