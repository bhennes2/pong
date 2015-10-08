Alert = React.createClass({

  componentDidMount() {
    setTimeout(() => {
      this.setState({closed: true});
    }, 1000);
  },

  getInitialState() {
    return {
      closed: false
    };
  },

  render() {

    var cx = React.addons.classSet;
    var classes = cx({
      'alert':    true,
      'closed':   this.state.closed,
      'alert-success': true
    });

    return (
      <p className={classes}>{this.props.alertMessage}</p>
    )
  }
});
