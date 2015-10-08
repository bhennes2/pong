Alert = React.createClass({

  displayAlert(params){
    this.props.showAlert = true;
    this.props.alertMessage = params.message;
  },

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
