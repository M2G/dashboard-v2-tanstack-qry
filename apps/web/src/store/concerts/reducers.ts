/* eslint-disable */
import { Reducer } from 'redux';
import { ConcertActionTypes, ConcertState } from './types';

// Type-safe initialState!
export const initialState: ConcertState = {
  data: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<ConcertState> = (state = initialState, action) => {
  const { data, errors, type } = action || {};
  switch (type) {
    case ConcertActionTypes.CONCERTS_GET_REQUEST:
      return { ...state, loading: true };
    case ConcertActionTypes.CONCERT_GET_REQUEST:
      return { ...state, loading: true };

    case ConcertActionTypes.CONCERTS_GET_SUCCESS:
      return { ...state, loading: false, data };
    case ConcertActionTypes.CONCERT_GET_SUCCESS:
      return { ...state, loading: false, data };

    case ConcertActionTypes.CONCERTS_GET_ERROR:
      return { ...state, loading: false, errors };
    case ConcertActionTypes.CONCERT_GET_ERROR:
      return { ...state, loading: false, errors: data };

    default:
      return state;
  }
};

/*
 * Instead of using default export, we use named exports. That way we can group these exports
 * inside the `index.js` folder.
 */
export { reducer as concertReducer };
