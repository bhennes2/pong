var {
  Router,
  Route,
  Redirect
} = ReactRouter;

Routes = React.createClass({

  render() {

    return (
      <Router history={ReactRouter.lib.BrowserHistory.history}>
        <Route component={App}>
          <Route path="main"          component={MainMenu} />
          <Route path="leaders"       component={Leaders} />
          <Route path="game/new"      component={ChoosePlayerMenu} />
          <Route path="game/:id"      component={ServingMenu} />
          <Route path="game/:id/play" component={Play} />
        </Route>
        <Route component={Admin}>
          <Route path="dashboard"     component={Dashboard} />
        </Route>
        <Redirect from="/" to="/main" />
      </Router>
    );
  }
});
