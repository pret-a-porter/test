import { ACTIONS } from 'constants';
import fetchDispatch from 'actions/fetchDispatch';

function resetErrorMessage () {
  return { type: ACTIONS.RESET_ERROR_MESSAGE }
}

function shouldFetchData ({ flights }) {
  return (!flights.data && !flights.isFetching);
}

function fetchData (options) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      return dispatch(fetchDispatch(options));
    }
  };
}

export default { resetErrorMessage, fetchData };
