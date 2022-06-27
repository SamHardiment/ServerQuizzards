const Player = require("../../../models/Player");
const pg = require("pg");
jest.mock("pg");

describe("Author", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    test("it resolves with players on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [{}, {}, {}] });
      const all = await Author.all;
      expect(all).toHaveLength(3);
    });
  });
});
