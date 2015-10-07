Admin = React.createClass({

  render() {

    var Link = ReactRouter.Link;

    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <ul className="navbar-list">
              <li className="navbar-item">
                <Link to={`/dashboard`} className="navbar-link">Dashboard</Link>
              </li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
});
