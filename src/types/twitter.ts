export interface Geotag {
  coordinates: {
    lat: number;
    long: number;
  };
  id: string;
  name: string;
  full_name: string;
  country: string;
  country_code: string;
  place_type: string;
}

export interface Tweet {
  id: string;
  text: string;
  createdAt: number;
  userName: string;
  date: string;
  geo: Geotag;
}

export interface Vendor {
  name: string;
  image: string;
  description: string;
  twitterId: string;
  tweets: Tweet[];
  created: number;
  updated: number;
}
