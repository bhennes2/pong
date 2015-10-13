if (Meteor.isClient) {
  Meteor.subscribe('players');
  Meteor.subscribe('games');
  Meteor.subscribe('challenges');

  Meteor.startup(function () {
    React.render(<Routes />, document.getElementById("pong-app"));
  });
}
