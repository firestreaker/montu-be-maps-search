import { config } from "dotenv";
import { describe } from "@jest/globals";
import { getPlaceAutocomplete } from "../src/maps-api";
import { getAutoCompleteDetails } from "../src";

config();
const apiKey = process.env.TOMTOM_API_KEY || "";

// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
  describe("getAutoCompleteDetails", () => {
    it("returns a promise", () => {
      const res = getAutoCompleteDetails("Charlotte Street");
      expect(res).toBeInstanceOf(Promise);
    });

    it("can fetch from the autocomplete api", async () => {
      const res = await getAutoCompleteDetails("Charlotte Street");
      const firstRes = res[0];
      expect(firstRes).toHaveProperty("placeId");
      expect(firstRes).toHaveProperty("streetName");
      expect(firstRes).toHaveProperty("countryCode");
      expect(firstRes).toHaveProperty("country");
      expect(firstRes).toHaveProperty("freeformAddress");
      expect(firstRes).toHaveProperty("municipality");
    });
  });

  describe("getPlaceAutocomplete", () => {
    // baseline
    it("works without optional parameters", async () => {
      const res = await getPlaceAutocomplete(apiKey, "Charlotte Street");
      expect(res).toHaveLength(100);
    });

    it("handles no results", async () => {
      const res = await getPlaceAutocomplete(apiKey, "asfasffasfasafsafs");
      expect(res).toStrictEqual([]);
    });

    it("handles error", async () => {
      expect(getPlaceAutocomplete(apiKey, "")).rejects.toThrow();
    });

    describe("limit parameter", () => {
      it("handles limit option of 1", async () => {
        const res = await getPlaceAutocomplete(apiKey, "Charlotte Street", {
          limit: 1,
        });
        expect(res).toHaveLength(1);
      });

      it("handles limit option of 0", async () => {
        const res = await getPlaceAutocomplete(apiKey, "Charlotte Street", {
          limit: 0,
        });
        expect(res).toHaveLength(0);
      });

      it("handles limit option of 100", async () => {
        const res = await getPlaceAutocomplete(apiKey, "Charlotte Street", {
          limit: 100,
        });
        expect(res).toHaveLength(100);
      });

      // the tomtom api only supports up to 100 limit
      it("handles limit option of 101", async () => {
        const res = await getPlaceAutocomplete(apiKey, "Charlotte Street", {
          limit: 101,
        });
        expect(res).toHaveLength(100);
      });
    });

    describe("ofs parameter", () => {
      it("works", async () => {
        const res0 = await getPlaceAutocomplete(apiKey, "Charlotte Street", {
          limit: 1,
        });
        const res1 = await getPlaceAutocomplete(apiKey, "Charlotte Street", {
          limit: 1,
          ofs: 0,
        });
        const res2 = await getPlaceAutocomplete(apiKey, "Charlotte Street", {
          limit: 1,
          ofs: 1,
        });
        expect(res1).toStrictEqual(res0);
        expect(res2).not.toStrictEqual(res0);
      });
    });
  });
});
