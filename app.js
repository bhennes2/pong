if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

if (Meteor.isClient) {

  Template.home.events({

    "click": function (event) {
      event.preventDefault();
      alert("Let's play!");
    }

  });

}
