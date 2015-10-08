Alert = React.createClass({

  render() {

    var cx = React.addons.classSet;
    var classes = cx({
      'alert':    true,
      'closed':   !this.props.showAlert,
      'alert-success': true
    });

    return (
      <p className={classes}>{this.props.alertMessage}</p>
    )
  }
});
