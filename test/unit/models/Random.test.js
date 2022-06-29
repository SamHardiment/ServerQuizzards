const Random = require("../../../models/Random");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig");

describe("Random", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with random on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}] });
      const all = await Random.all;
      expect(all).toHaveLength(2);
    });
  });
});
