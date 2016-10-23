import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Filter extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { options, changeHandler, value } = this.props;

    return (
      <select onChange={changeHandler} value={value}>
        <option value="">All</option>
        {options.map(item =>
          <option key={item} value={item}>
            {item}
          </option>
        )}
      </select>
    )
  }

}

Filter.propTypes = {
  options: React.PropTypes.array.isRequired,
  changeHandler: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
}

export default Filter;
