if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

if (Meteor.isClient) {

  $(document).on('keyup', function (e) {
    if (e.charCode == 0){
      $('.score').each(function(i, el){
        var value = $(el).text();
        $(el).text(parseInt(value) + 1);
      });
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

