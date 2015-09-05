var {
  Router,
  Route,
  Redirect
} = ReactRouter;

Routes = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <Router history={ReactRouter.lib.BrowserHistory.history}>
        <Route component={App}>
          <Route path="main" component={MainMenu} />
          <Route path="leaders" component={Leaders} />
          <Route path="play" component={Play} />
        </Route>
        <Redirect from="/" to="/main" />
      </Router>
    );
  }
});
