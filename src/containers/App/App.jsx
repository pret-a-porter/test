import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { resetErrorMessage } from 'actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class App extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  renderErrorMessage () {
    const { errorMessage } = this.props;
    if (!errorMessage) return null;

    return (
      <div>
        {errorMessage}
      </div>
    )
  }

  render () {
    const { children } = this.props;

    return (
      <div>
        {this.renderErrorMessage()}
        <main>{children}</main>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

function mapStateToProps (state) {
  return {
    errorMessage: state.errorMessage.get('errorMessage'),
    isFetching: state.flights.get('isFetching')
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage: resetErrorMessage
})(App)
