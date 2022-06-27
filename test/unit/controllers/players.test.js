const playersController = require("../../../controllers/players");
const Player = require("../../../models/Player");

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn((code) => ({ send: mockSend, json: mockJson }));
const mockRes = { status: mockStatus };

describe("players controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns authors with a 200 status code", async () => {
      jest
        .spyOn(Player, "all", "get")
        .mockResolvedValue(["player1", "player2"]);
      await authorsController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(["author1", "author2"]);
    });
  });
});
