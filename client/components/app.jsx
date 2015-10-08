App = React.createClass({

  render() {

    return (
      <div className="in-game">
        {this.props.children}
      </div>
    );
  }
});
