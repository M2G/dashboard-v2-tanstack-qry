import { ConcertActionTypes } from './types';

export const getConcertError = (errors: any) => ({
  errors,
  type: ConcertActionTypes.CONCERT_GET_ERROR,
});

export const getConcertsError = (data: any) => ({
  data,
  type: ConcertActionTypes.CONCERTS_GET_ERROR,
});

export const getConcertAction = (args?: any) => ({
  type: ConcertActionTypes.CONCERT_GET_REQUEST,
  ...args,
});

export const getConcertsAction = (args?: any) => {
  console.log('getConcertsAction getConcertsAction getConcertsAction');
  return {
    type: ConcertActionTypes.CONCERTS_GET_REQUEST,
    ...args,
  };
};

export const getConcertSuccess = ({ data, ...args }: any) => {
  return {
    data,
    type: ConcertActionTypes.CONCERT_GET_SUCCESS,
    ...args,
  };
};

export const getConcertsSuccess = ({ data, ...args }: any) => {
  return {
    data,
    type: ConcertActionTypes.CONCERTS_GET_SUCCESS,
    ...args,
  };
};
