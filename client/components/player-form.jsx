PlayerForm = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  getMeteorData() {
    return {
      player: Players.findOne(this.props.params.id)
    };
  },

  submitForm(event){
    event.preventDefault();

    Meteor.call("updatePlayer", this.props.params.id, {
      name: this.refs.name.getDOMNode().value,
      email: this.refs.email.getDOMNode().value,
      taunt: this.refs.taunt.getDOMNode().value
    }, ()=>{
      this.transitionTo(`/players/${this.props.params.id}`, {alertMessage: "Player successfully updated!", showAlert: true });
    });
  },

  render() {

    return (
      <div>
        <h4>Edit Player</h4><br/>
        <form onSubmit={this.submitForm}>
          <div className="row">
            <div className="six columns">
              <label>Name</label>
              <input name="name" className="u-full-width" type="text" ref="name" defaultValue={this.data.player.name} />
            </div>
            <div className="six columns">
              <label>Email</label>
              <input name="email" className="u-full-width" type="email" ref="email" defaultValue={this.data.player.email} placeholder="test@mailbox.com" />
            </div>
          </div>
          <label>Taunt Message</label>
          <textarea name="taunt" className="u-full-width" placeholder="Hi Dave …" ref="taunt" defaultValue={this.data.player.taunt}></textarea>
          <input className="button-primary" type="submit" value="Update" />
        </form>
      </div>
    );
  }
});
