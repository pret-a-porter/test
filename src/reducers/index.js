import { ACTIONS } from 'constants';
import { combineReducers } from 'redux';
import { Map } from 'immutable';
import flights from 'reducers/flights';

// Updates error message to notify about the failed fetches.
function errorMessage (state = Map(), action) {
  const { type, error } = action;

  if(type === ACTIONS.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.errorMessage;
  }

  return state;
}

const rootReducer = combineReducers({
  flights,
  errorMessage
});

export default rootReducer;
