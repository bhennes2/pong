if (Meteor.isClient) {
  Meteor.subscribe('players');
  Meteor.subscribe('games');

  Meteor.startup(function () {
    React.render(<Routes />, document.getElementById("pong-app"));
  });
}
