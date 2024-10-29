import axios from "axios";
import type {
  IGetPlaceAutocompleteOptions,
  SearchResult,
  tomtomSearchResponse,
} from "./maps-api.types";

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  key: string,
  query: string,
  options: IGetPlaceAutocompleteOptions = { limit: 100 }
): Promise<SearchResult[]> {
  if (options.limit <= 0) {
    return [];
  }

  const autocomplete = await axios.get<tomtomSearchResponse>(
    `https://api.tomtom.com/search/2/search/${query}.json'`,
    {
      params: {
        key,
        countrySet: "AU",
        ...options,
      },
    }
  );
  
  return autocomplete.data.results.map((result) => {
    const { id: placeId, ...res } = result; // rename placeId key
    return {
      placeId,
      ...res,
    };
  });
}
