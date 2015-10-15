Leaders = React.createClass({

  mixins: [ReactRouter.Navigation, ReactMeteorData],

  getMeteorData() {

    const handle = Meteor.subscribe("playersWin");

    return {
      isReady: handle.ready(),
      players: Players.find({}).fetch()
    };
  },

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

  componentWillMount() {
    this.pageSize = 4;
    this.menuActions = {
      next: this.nextLeaders,
      prev: this.prevLeaders,
      main: this.backToMainMenu
    };
  },

  getInitialState() {
    return { currentPage: 0, forceReset: false };
  },

  render() {

    let menuItems = [];
    let players   = [];

    if (this.data.isReady) {

      if (this.state.currentPage > 0) {
        menuItems.push({ title: "Previous",  action: "prev" });
      }

      if (this.data.players.length > (this.state.currentPage+1)*this.pageSize) {
        menuItems.push({ title: "Next",  action: "next" });
      }

      menuItems.push({ title: "Main Menu", action: "main" });

      players = this.data.players
      .splice(this.state.currentPage*this.pageSize, this.pageSize)
      .map(function(player) {
        return (
          <li key={player._id}>
            <span className="name">{player.name}</span>
            <span className="record">{player.wins} - {player.losses}</span>
          </li>
        );
      });
    }

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
