var {
  Router,
  Route,
  Redirect
} = ReactRouter;

Link = ReactRouter.Link;

Routes = React.createClass({

  render() {

    return (
      <Router history={ReactRouter.lib.BrowserHistory.history}>
        <Route component={App}>
          <Route path="main"          component={MainMenu} />
          <Route path="leaders"       component={Leaders} />
          <Route path="game/new"      component={ChoosePlayerMenu} />
          <Route path="game_guest/new"    component={GuestServingMenu} />
          <Route path="game/:id"      component={ServingMenu} />
          <Route path="game/:id/play" component={Play} />
          <Route path="game_guest/play/:firstServer" component={GuestPlay} />
        </Route>
        <Route component={Admin}>
          <Route path="dashboard"           component={Dashboard} />
          <Route path="players/:id"         component={PlayerDetail} />
          <Route path="players/:id/edit"    component={PlayerForm} />
        </Route>
        <Redirect from="/" to="/main" />
      </Router>
    );
  }
});
