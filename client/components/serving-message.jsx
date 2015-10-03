ServingMessage = React.createClass({
  render: function() {
    var classes = 'serving-message';
    if (!this.props.show){
      classes += ' hide';
    }
    return <span className={classes}>Serving</span>;
  }
});
