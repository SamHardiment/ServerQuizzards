const Animal = require("../../../models/Animal");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig");

describe("Animal", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with Animal on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}] });
      const all = await Animal.all;
      expect(all).toHaveLength(2);
    });
  });
});
