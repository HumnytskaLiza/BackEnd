const mongoose = require("mongoose");
const { Tables } = require("../../../models");
const { createTable } = require("./createTable");

describe("createTable", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      auth: {
        username: process.env.MONGO_DB_LOGIN,
        password: process.env.MONGO_DB_PASSWORD,
      },
    });
    console.log(`mongoose was connected`);
  });

  it("should be saved in db", async () => {
    const req = {
      body: {
        tableId: 5,
      },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockImplementation(() => res),
    };

    await createTable(req, res);
    const _id = res.send.mock.calls[0][0]._id;
    const doc = await Tables.findById(_id);

    expect(doc).not.toBeNull();
    expect(doc.tableId).toBe(5);
  });
});
