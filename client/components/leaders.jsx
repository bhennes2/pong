Leaders = React.createClass({

  mixins: [ReactRouter.Navigation, ReactMeteorData],

  nextLeaders() {
    this.setState({
      currentPage: this.state.currentPage+1,
      forceReset: true
    });
  },

  prevLeaders() {
    this.setState({
      currentPage: this.state.currentPage-1,
      forceReset: true
    });
  },

  backToMainMenu() {
    this.transitionTo("/main");
  },

  onSelect(item, menu) {
    this.menuActions[item.action]();
  },

  winPct(player) {
    var pct = player.wins / (player.wins + player.losses)
    return isFinite(pct) ? pct : 1;
  },

  comparePlayers(a,b) {
    var result = 0;

    // 1. By winning %
    result = this.winPct(b) - this.winPct(a);

    // 2. By losses
    if (result === 0) {
      result = a.losses - b.losses;
    }

    // 3. By wins
    if (result === 0) {
      result = b.wins - a.wins;
    }

    // 4. By name
    if (result === 0) {
      result = a.name.localeCompare(b.name);
    }

    return result;
  },

  componentWillMount() {
    this.pageSize = 4;
    this.menuActions = {
      next: this.nextLeaders,
      prev: this.prevLeaders,
      main: this.backToMainMenu
    };
  },

  getMeteorData() {
    return { players: Players.find({}).fetch() };
  },

  getInitialState() {
    return { currentPage: 0, forceReset: false };
  },

  render() {

    var menuItems = [];

    if (this.state.currentPage > 0) {
      menuItems.push({ title: "Previous",  action: "prev" });
    }

    if (this.data.players.length > (this.state.currentPage+1)*this.pageSize) {
      menuItems.push({ title: "Next",  action: "next" });
    }

    menuItems.push({ title: "Main Menu", action: "main" });

    var players = this.data.players
    .sort(this.comparePlayers)
    .splice(this.state.currentPage*this.pageSize, this.pageSize)
    .map(function(player) {
      return (
        <li>
          <span className="name">{player.name}</span>
          <span className="record">{player.wins} - {player.losses}</span>
        </li>
      );
    });

    return (
      <div>
        <h1 className="leader-board-title">
          <img src="/rocket.png" />Leaders
        </h1>
        <ul className="leader-board">{players}</ul>
        <Menu
          items={menuItems}
          listens={[KeyCode.Left, KeyCode.Right]}
          onSelect={this.onSelect}
          forceReset={this.state.forceReset}
        />
        <p className="game-credits">&copy; LaunchPad Lab 2015</p>
      </div>
    );
  }
});
