PlayerForm = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  getMeteorData() {
    let id = this.props.params.id;
    return {
      player: Players.findOne({ _id: id })
    };
  },

  submitForm(event){
    event.preventDefault();
    let id = this.props.params.id;
    Players.update(this.props.params.id, { $set: { name: this.props.name, email: this.props.email, taunt: this.props.taunt } });
    // displayAlert({ message: 'Player successfully udpated!' })
    this.transitionTo('/players/' + id);
  },

  handleChange(event){
    var target = event.target,
        name = target.name,
        value = target.value;

    this.props[name] = value;
  },

  setDefaultProps: function(player){
    this.props.name = player.name;
    this.props.email = player.email;
    this.props.taunt = player.taunt;
  },

  render() {

    var player = this.data.player;

    this.setDefaultProps(player);

    return (
      <div>
        <h4>Edit Player</h4><br/>
        <form onSubmit={this.submitForm}>
          <div className="row">
            <div className="six columns">
              <label>Name</label>
              <input name="name" onChange={this.handleChange} className="u-full-width" type="text" defaultValue={player.name} />
            </div>
            <div className="six columns">
              <label>Email</label>
              <input name="email" onChange={this.handleChange} className="u-full-width" type="email" defaultValue={player.email} placeholder="test@mailbox.com" />
            </div>
          </div>
          <label>Taunt Message</label>
          <textarea onChange={this.handleChange} name="taunt" className="u-full-width" placeholder="Hi Dave …" defaultValue={player.taunt}></textarea>
          <input className="button-primary" type="submit" value="Update" />
        </form>
      </div>
    );
  }
});
