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
          <Route path="main" component={MainMenu} />
          <Route path="leaders" component={Leaders} />
          <Route path="game/new" component={ChoosePlayerMenu} />
          <Route path="game/:id" component={Play} />
        </Route>
        <Redirect from="/" to="/main" />
      </Router>
    );
  }
});

// <Route path="game/new" component={ServingMenu} />
