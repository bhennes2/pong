ServingMessage = React.createClass({

  propTypes: {
    show: React.PropTypes.bool
  },

  render: function() {
    var classes = 'serving-message';
    if (!this.props.show){
      classes += ' hide';
    }
    return <span className={classes}>Serving</span>;
  }
});
