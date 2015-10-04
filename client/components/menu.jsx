Menu = React.createClass({
  mixins: [KeyHandler, ReactRouter.Navigation],

  propTypes: {
    items: React.PropTypes.array
  },

  hold(keyCode) {
    var item = this.props.items[this.state.selected];
    this.transitionTo(item.target, item.query);
  },

  tap(keyCode) {
    var selected = (this.state.selected + 1) % this.props.items.length;
    this.setState({selected: selected});
  },

  getInitialState() {
    return { selected: 0 };
  },

  render() {

    var menuItems = this.props.items.map(function(item, idx) {
      var selected = (this.state.selected === idx);
      return <Menu.Item title={item.title} selected={selected} key={"item"+idx}/>;
    }, this);

    return <div>{menuItems}</div>;
  }
});

Menu.Item = React.createClass({

  propTypes: {
    title:    React.PropTypes.string,
    selected: React.PropTypes.boolean
  },

  render() {

    var cx = React.addons.classSet;
    var classes = cx({
      'menu-item': true,
      'game-start': this.props.selected
    });
    return <p className={classes}>{this.props.title}</p>;
  }
});
