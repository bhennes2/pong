App = React.createClass({
  getInitialState: function() {
      return {};
  },
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});
