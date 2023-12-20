interface IArtist {
  artist_id: number;
  display_name: string;
  uri: string;
}

export interface IConcert {
  artist: IArtist;
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
}

export interface IUser {
  created_at: Date | null;
  email: null | string;
  first_name: null | string;
  id: null | number;
  last_name: null | string;
  modified_at: Date | null;
  password: null | string;
}

export interface ISignup {
  email: string;
  password: string;
}

export interface ISignin {
  email: string;
  password: string;
}

export interface ICreateUser {
  email: string;
  password: string;
}
