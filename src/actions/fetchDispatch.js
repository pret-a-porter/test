import fetch from 'isomorphic-fetch';
import { ACTIONS } from 'constants';

function handleResponse (response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  throw new Error(formatErrorMessage(response));
}

function formatErrorMessage (res) {
  return `[${res.status}]: ${res.statusText} (${res.url})`;
}

function errorAction (error) {
  return {
    type: ACTIONS.SET_ERROR_MESSAGE,
    error: true,
    errorMessage: error.message
  };
}

export default function fetchDispatch (opts) {
  return (dispatch) => {
    dispatch({ type: opts.types.request });

    return fetch(opts.url, {
      method: opts.method || "GET",
      headers: opts.headers || {}
    })
      .then(handleResponse)
      .then((data) => { // Dispatch the recevied action with type and data
        return dispatch(Object.assign({ type: opts.types.receive }, { data }));
      })
      .catch((error) => dispatch(errorAction(error)));
  };
}
