const bodyParser = Meteor.npmRequire( 'body-parser');
Picker.middleware( bodyParser.json() );

const postRoutes = Picker.filter(function(req, res) {
  return req.method == "POST";
});

const getRoutes = Picker.filter(function(req, res) {
  return req.method == "GET";
});

postRoutes.route('/challenges', function(params, req, res, next) {
  const query = req.body.query;
  if (query) {
    Meteor.call("createChallenge", query.challengerId, query.challengeeId);
  }

  res.end('success');
});

getRoutes.route('/last_game.json', function(params, req, res, next) {

  latestGame = Games.findOne({}, {sort: {DateTime: 1, limit: 1}});
  player1 = Players.findOne(latestGame.player1);
  player2 = Players.findOne(latestGame.player2);

  if (latestGame.player1Score > latestGame.player2Score){
    winningPlayer = player1;
    winningScore = latestGame.player1Score;
    losingPlayer = player2;
    losingScore = latestGame.player2Score;
  } else {
    winningPlayer = player2;
    winningScore = latestGame.player2Score;
    losingPlayer = player1;
    losingScore = latestGame.player1Score;
  }

  var message = "";

  if (latestGame.inProgress){
    message = "A live game is being played. ";
    message += winningPlayer.name + " is beating up on " + losingPlayer.name + ". ";
    message += "The score is " + winningScore + " to " + losingScore + ".";
  } else {
    message = winningPlayer.name + " just crushed " + losingPlayer.name + " " + winningScore + " to " + losingScore + "! ";
    message += winningPlayer.name + ' says ' + winningPlayer.taunt;
  }

  res.end('{ "message": "' + message + '" }');
});

