const randomController = require("../../../controllers/random");
const Random = require("../../../models/Random");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("random controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns a random word with a 200 status code", async () => {
      jest.spyOn(Random, "all", "get").mockResolvedValue(["randomword"]);
      await randomController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["randomword"]);
    });
  });

  describe("index", () => {
    test("it returns with a 500 status code when the fetch fails", async () => {
      jest.spyOn(Random, "all", "get").mockResolvedValue(["randomword"]);
      await randomController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(500);
    });
  });
});
