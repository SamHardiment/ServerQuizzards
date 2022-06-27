describe("habits endpoints", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    await api.close();
    api = app.listen(5000, () =>
      console.log("Test server running on port 8000")
    );
  });

  afterAll(async () => {
    console.log("Gracefully stopping test server");
    await api.close();
  });

  it("should return a list of all players in database", async () => {
    const res = await request(api).get("/players");
    expect(res.body).toHaveLength(2);
  });
});
