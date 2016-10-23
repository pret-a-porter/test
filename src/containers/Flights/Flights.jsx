import React, { PropTypes, Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'actions';
import { ACTIONS } from 'constants';
import { uniq, map } from 'lodash';

import Filter from 'components/Filter';
import Card from 'components/Card';
import style from 'containers/Flights/style.scss'

class Flights extends Component {

  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    this.changeFilterHandler = this.changeFilterHandler.bind(this);

    this.state = {
      selectedCarrier: null
    };
  }

  componentWillMount() {
    this.props.fetchData({
      url: 'data.json',
      types: {
        request: ACTIONS.REQUEST_DATA,
        receive: ACTIONS.RECEIVE_DATA
      }
    });
  }

  getFilterOptions() {
    const { data } = this.props;
    return uniq(map(data, 'carrier'))
  }

  changeFilterHandler(e) {
    const { router } = this.context;
    const { location: { pathname }} = this.props;

    router.push({
      pathname: pathname,
      query: {
        carrier: e.target.value
      }
    });
  }

  filterData() {
    const { location: { query }  } = this.props;
    let { data } = this.props;

    if(!!query.carrier) {
      data = data.filter(item => {
        return (item.carrier === query.carrier);
      });
    }

    return data;
  }

  render() {
    const { location: { query }  } = this.props;
    const data = this.filterData();

    return (
      <div className={style.page}>
        <div className={style.filter}>
          <Filter value={query.carrier} options={this.getFilterOptions()} changeHandler={this.changeFilterHandler}/>
        </div>
        <div className={style.listWrapper}>
          {data.map(item =>
              <Card key={item.id}
                    from={item.direction.from}
                    to={item.direction.to}
                    arrivalTime={item.arrival}
                    departureTime={item.departure}
                    carrier={item.carrier} />
          )}
        </div>
      </div>
    )
  }
}

Flights.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    data: state.flights.get('data').toJS(),
    isFetching: state.flights.get('isFetching')
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Flights)
