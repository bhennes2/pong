Menu = React.createClass({

  mixins: [KeyHandler],

  propTypes: {
    items:      React.PropTypes.array,
    listens:    React.PropTypes.array.isRequired,
    onSelect:   React.PropTypes.func,
    onUnSelect: React.PropTypes.func
  },

  hold(keyCode) {
    if (this.props.listens.indexOf(keyCode) === -1) {
      return;
    }

    var item = this.props.items[this.state.highlighted];

    if (this.state.selected === -1) {
      this.setState({
        selected: this.state.highlighted,
        highlighted: -1
      });

      if (this.props.onSelect) {
        this.props.onSelect(item);
      }

    } else {
      this.setState({
        highlighted: this.state.selected,
        selected: -1,
      });

      if (this.props.onUnSelect) {
        this.props.onUnSelect(item);
      }
    }
  },

  tap(keyCode) {
    if (this.props.listens.indexOf(keyCode) === -1) {
      return;
    }

    // Do nothing if item has been selected
    if (this.state.selected !== -1) {
      return;
    }

    var highlighted = (this.state.highlighted + 1) % this.props.items.length;
    this.setState({highlighted: highlighted});
  },

  getInitialState() {
    return { highlighted: 0, selected: -1 };
  },

  render() {

    var menuItems = this.props.items.map(function(item, idx) {
      var highlighted = (this.state.highlighted === idx);
      var selected    = (this.state.selected === idx);

      return (
        <Menu.Item
          title={item.title}
          highlighted={highlighted}
          selected={selected}
          key={"item"+idx}
        />
      );

    }, this);

    return <div>{menuItems}</div>;
  }
});

Menu.Item = React.createClass({

  propTypes: {
    title:       React.PropTypes.string,
    highlighted: React.PropTypes.boolean,
    selected:    React.PropTypes.boolean
  },

  render() {

    var cx = React.addons.classSet;
    var classes = cx({
      'menu-item':  true,
      'game-start': this.props.highlighted,
      'selected':   this.props.selected
    });
    return <p className={classes}>{this.props.title}</p>;
  }
});
