App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    const handles = [
      Meteor.subscribe("players"),
      Meteor.subscribe("games"),
      Meteor.subscribe("challenges")
    ];

    return {
      isReady: handles.every(handle=>{return handle.ready();}),
      store : {
        players:    Players.find().fetch(),
        games:      Games.find().fetch(),
        challenges: Challenges.find().fetch()
      }
    };
  },

  render() {

    const children = this.data.isReady ? React.Children.map(this.props.children, child=>{
      return React.addons.cloneWithProps(child, {store: this.data.store });
    }) : [];

    return <div className="in-game">{children}</div>;
  }
});
