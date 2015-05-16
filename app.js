if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

if (Meteor.isClient) {

  var score = [0, 0];

  $(document).on('keyup', function (e) {
    var path = window.location.pathname;
    if (path === "/"){
      window.location.pathname = "/play_game";
      return
    }
    if (e.keyCode == 49){
      score[0] += 1;
      $('.score:first').text(score[0]);
    } else if (e.keyCode == 50){
      score[1] += 1;
      $('.score:last').text(score[1]);
    }
    var totalScore = score[0] + score[1],
        message = $('.game-message p');
    if (score[0] >= 21 && (score[0] - score[1]) > 1){
      message.text("Player 1 wins!");
    } else if (score[1] >= 21 && (score[1] - score[0]) > 1) {
      message.text("Player 2 wins!");
    } else if (totalScore % 5 === 0){
      message.text("Change server!");
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

