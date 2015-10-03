KeyHandler = {

  componentDidMount: function() {
    var currentKey = -1,
        time = -1;

    var myHandleKeyDown = function handleKeyDown(event) {
      if (event.keyCode !== 65 && event.keyCode !== 66) {
        return;
      }

      if (currentKey === -1) {
        currentKey = event.keyCode;
        time = Date.now();
      }
    }.bind(this);

    var myHandleKeyUp = function handleKeyUp(event) {
      if (event.keyCode !== 65 && event.keyCode !== 66) {
        return;
      }

      if (currentKey === event.keyCode) {
        if (Date.now() - time >= 500) {
          this.hold(event.keyCode);
        } else {
          this.tap(event.keyCode);
        }
        currentKey = -1;
        time = -1;
      }
    }.bind(this);

    window.addEventListener('keydown', myHandleKeyDown);
    window.addEventListener('keyup', myHandleKeyUp);

    this.setState({
      handleKeyDown: myHandleKeyDown,
      handleKeyUp: myHandleKeyUp
    });
  },

  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.state.handleKeyDown);
    window.removeEventListener('keyup', this.state.handleKeyUp);
  }
};
