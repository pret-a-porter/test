import { ACTIONS } from 'constants';
import { List, Map, fromJS } from 'immutable';

const initialState = Map({
  isFetching: false,
  data: List()
});

export default function(state = initialState, action) {
  switch (action.type) {

    case ACTIONS.REQUEST_DATA:
      return state.set('isFetching', true);

    case ACTIONS.RECEIVE_DATA:
      return state.set('isFetching', false).set('data', fromJS(action.data.flights));

    default:
      return state;
  }
}
