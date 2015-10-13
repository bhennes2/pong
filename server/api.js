const bodyParser = Meteor.npmRequire( 'body-parser');
Picker.middleware( bodyParser.json() );

const postRoutes = Picker.filter(function(req, res) {
  return req.method == "POST";
});

postRoutes.route('/challenges', function(params, req, res, next) {
  const query = req.body.query;
  if (query) {
    Meteor.call("createChallenge", query.challengerId, query.challengeeId);
  }

  res.end('success');
});
