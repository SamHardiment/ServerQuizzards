const foodController = require("../../../controllers/food");
const Food = require("../../../models/food");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("food controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns a food word with a 200 status code", async () => {
      jest.spyOn(Food, "all", "get").mockResolvedValue(["foodword"]);
      await foodController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["foodword"]);
    });
  });

  describe("index", () => {
    test("it returns with a 500 status code when the fetch fails", async () => {
      jest.spyOn(Food, "all", "get").mockResolvedValue(["foodword"]);
      await foodController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(500);
    });
  });
});
