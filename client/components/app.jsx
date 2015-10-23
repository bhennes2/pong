App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {

    const handles = [
      Meteor.subscribe("players"),
      Meteor.subscribe("games"),
      Meteor.subscribe("challenges")
    ];

    return {
      isReady: handles.every(handle=>{return handle.ready();})
    };
  },

  render() {
    return <div className="in-game">{this.data.isReady ? this.props.children : []}</div>;
  }
});
