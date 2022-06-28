const Player = require("../../../models/Player");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig");

describe("Author", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with players on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await Player.all;
      expect(all).toHaveLength(3);
    });
  });
});
