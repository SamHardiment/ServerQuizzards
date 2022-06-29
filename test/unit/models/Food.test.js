const Food = require("../../../models/Food");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig");

describe("Food", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with Food on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}] });
      const all = await Food.all;
      expect(all).toHaveLength(2);
    });
  });
});
