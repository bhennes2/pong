Admin = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    const handles = [
      Meteor.subscribe("players"),
      Meteor.subscribe("games")
    ];

    return {
      isReady: handles.every(handle=>{return handle.ready();})
    };
  },

  render() {

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
        {this.data.isReady ? this.props.children : []}
      </div>
    );
  }
});
