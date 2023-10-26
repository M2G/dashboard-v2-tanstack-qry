/* eslint-disable */
/*
 * Response object for GET /heroes
 * https://docs.opendota.com/#tag/heroes%2Fpaths%2F~1heroes%2Fget
 */

interface IArtist {
  artist_id: number;
  display_name: string;
  uri: string;
}

export interface IConcert extends ApiResponse {
  city: string;
  concert_id: number;
  datetime: Date;
  display_name: string;
  lat: number;
  lng: number;
  popularity: number;
  status: string;
  type: string;
  uri: string;
  artist: IArtist;
}

/*
 * This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
 * the expected return type of your API response.
 */
export type ApiResponse = Record<string, any>;

/*
 * Use `enum`s for better autocompletion of action type names. These will
 * be compiled away leaving only the final value in your compiled code.
 *
 * Define however naming conventions you'd like for your action types, but
 * personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
 * of Redux's `@@INIT` action.
 */

export enum ConcertActionTypes {
  CONCERTS_GET_REQUEST = '@@auth/CONCERTS_GET_REQUEST',
  CONCERTS_GET_SUCCESS = '@@auth/CONCERTS_GET_SUCCESS',
  CONCERTS_GET_ERROR = '@@auth/CONCERTS_GET_ERROR',

  CONCERT_GET_REQUEST = '@@auth/CONCERT_GET_REQUEST',
  CONCERT_GET_SUCCESS = '@@auth/CONCERT_GET_SUCCESS',
  CONCERT_GET_ERROR = '@@auth/CONCERT_GET_ERROR',

  CONCERTS_REQUEST_ERROR = '@@auth/CONCERTS_REQUEST_ERROR',
}

/*
 * Declare state types with `readonly` modifier to get compile time immutability.
 * https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
 */
export interface ConcertState {
  readonly loading: boolean;
  readonly data: IConcert[];
  readonly errors?: string;
}
