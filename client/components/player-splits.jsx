PlayerSplits = React.createClass({

  mixins: [ReactMeteorData, ReactRouter.Navigation],

  getMeteorData() {
    return {
    };
  },

  render() {

    return (
      <form>
        <div className="row">
          <div className="three columns u-pull-right">
            <label for="filter">Splits</label>
            <select name="filter" ref="filter" className="u-full-width" id="filter" defaultValue="">
              <option disabled value="">- v. -</option>
              <option value="Dave">Dave</option>
              <option value="Ryan">Ryan</option>
              <option value="Option 3">Can I get your number?</option>
            </select>
          </div>
        </div>
      </form>
    )
  }
})
