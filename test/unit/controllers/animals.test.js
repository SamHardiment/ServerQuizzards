const animalsController = require("../../../controllers/animals");
const Animal = require("../../../models/animal");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("animals controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns a animals word with a 200 status code", async () => {
      jest.spyOn(Animal, "all", "get").mockResolvedValue(["animalsword"]);
      await animalsController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["animalsword"]);
    });
  });

  describe("index", () => {
    test("it returns with a 500 status code when the fetch fails", async () => {
      jest.spyOn(Animal, "all", "get").mockResolvedValue(["animalsword"]);
      await animalsController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(500);
    });
  });
});
