PlayerForm = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  getMeteorData() {
    return {
      player: Players.findOne(this.props.params.id)
    };
  },

  submitForm(event){
    event.preventDefault();

    Players.update(this.props.params.id, { $set: {
      name: this.refs.name.getDOMNode().value,
      email: this.refs.email.getDOMNode().value,
      taunt: this.refs.taunt.getDOMNode().value
    } });

    this.transitionTo('/players/' + this.props.params.id, {alertMessage: "Player successfully updated!", showAlert: true });
  },

  render() {

    var player = this.data.player || {};

    return (
      <div>
        <h4>Edit Player</h4><br/>
        <form onSubmit={this.submitForm}>
          <div className="row">
            <div className="six columns">
              <label>Name</label>
              <input name="name" className="u-full-width" type="text" ref="name" defaultValue={player.name} />
            </div>
            <div className="six columns">
              <label>Email</label>
              <input name="email" className="u-full-width" type="email" ref="email" defaultValue={player.email} placeholder="test@mailbox.com" />
            </div>
          </div>
          <label>Taunt Message</label>
          <textarea name="taunt" className="u-full-width" placeholder="Hi Dave …" ref="taunt" defaultValue={player.taunt}></textarea>
          <input className="button-primary" type="submit" value="Update" />
        </form>
      </div>
    );
  }
});
