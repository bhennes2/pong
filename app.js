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

}
