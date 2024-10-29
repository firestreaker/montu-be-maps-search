import { getPlaceAutocomplete } from "./maps-api";
import type { tomtomAddress } from "./maps-api.types";

interface Address extends tomtomAddress {
  placeId: string;
}

export async function getAutoCompleteDetails(
  address: string
): Promise<Address[]> {
  const apiKey = process.env.TOMTOM_API_KEY || ""; // empty string equivalent to no key provided
  // get autocomplete results
  return getPlaceAutocomplete(apiKey, address).then(
    async (autocompleteResults) =>
      // loop over and get details and map results
      autocompleteResults.map(({ placeId, address }) => {
        return { placeId, ...address };
      })
  );
}
