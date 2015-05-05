if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

if (Meteor.isClient) {

  Template.body.events({
    "click": function(event){
      event.preventDefault();
    }
  });

  Router.route('/', {
    name: 'Home',
    template: 'Home'
  });

  Router.route('/play_game', {
    name: 'PlayGame',
    template: 'PlayGame'
  });

}
