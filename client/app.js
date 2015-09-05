// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }

// if (Meteor.isClient) {

//   var score = [0, 0],
//       newGame = true,
//       gameOver = false;

//   $(document).on('keyup', function (e) {
//     var path = window.location.pathname,
//         $gameMessage = $(".game-message"),
//         $servingMessages = $('.serving-message');
//     if (path === "/"){
//       window.location.pathname = "/play_game";
//       return
//     }

//     if (newGame){
//       if (e.keyCode == 65){
//         $servingMessages.filter(':first').removeClass('hide');
//       } else if (e.keyCode == 66){
//         $servingMessages.filter(':last').removeClass('hide');
//       }
//       newGame = false;
//       $gameMessage.addClass('hide');
//       return;
//     }

//     if (!gameOver){
//       if (e.keyCode == 65){
//         score[0] += 1;
//         $('.score:first').text(score[0]);
//       } else if (e.keyCode == 66){
//         score[1] += 1;
//         $('.score:last').text(score[1]);
//       }
//       var totalScore = score[0] + score[1],
//           message = $('.game-message p');
//       if (score[0] >= 21 && (score[0] - score[1]) > 1){
//         $gameMessage.removeClass('hide');
//         message.text("Player 1 wins!");
//         gameOver = true;
//       } else if (score[1] >= 21 && (score[1] - score[0]) > 1) {
//         $gameMessage.removeClass('hide');
//         message.text("Player 2 wins!");
//         gameOver = true;
//       } else if (totalScore % 5 === 0 && totalScore > 0){
//         $gameMessage.removeClass('hide');
//         message.text("Change server!");
//         $servingMessages.toggleClass('hide');
//       } else {
//         $gameMessage.addClass('hide');
//       }
//     }
//   });

//   Router.route('/', {
//     name: 'Home',
//     template: 'Home'
//   });

//   Router.route('/play_game', {
//     name: 'PlayGame',
//     template: 'PlayGame'
//   });

// }

