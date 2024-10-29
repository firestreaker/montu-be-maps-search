export interface tomtomAddress {
  streetName: string;
  municipality: string;
  countrySecondarySubdivision: string;
  countrySubdivision: string;
  countrySubdivisionName: string;
  countrySubdivisionCode: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  localName: string;
}

export interface tomtomCoordinate {
  lat: number;
  lon: number;
}

export interface tomtomSearchResponse {
  results: {
    type: string;
    id: string;
    score: number;
    address: tomtomAddress;
    position: tomtomCoordinate;
    viewport: {
      topLeftPoint: tomtomCoordinate;
      btmRightPoint: tomtomCoordinate;
    };
  }[];
}

export interface SearchResult {
  placeId: string;
  address: tomtomAddress;
}

export interface IGetPlaceAutocompleteOptions {
  limit: number;
  ofs?: number
}
