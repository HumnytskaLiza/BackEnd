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
    const req = { body: { tableId: 5 } };
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

  it("tableId is null", async () => {
    const req = { body: {} };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockImplementation(() => res),
    };

    await createTable(req, res);
    expect(res.status).toBeCalledWith(400);
    // expect(res.body.message).toEqual({
    //   message:
    //     "Parameter tableId is required",
    // });
  });

  it("tableId is not unique", async () => {
    const table = await Tables.create({
      tableId: 5,
      waiterId: "646a5175679ba9696a6b0b0a",
      orderId: "646a5175679ba9696a6b0b0a",
    });
    const req = { body: { tableId: 5 } };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockImplementation(() => res),
    };

    await createTable(req, res);

    expect(req.body.tableId).toBe(table.tableId);
    expect(res.status).toBeCalledWith(400);
    // expect(res.body.message).toEqual({
    //   message:
    //     "Table with id 5 already exists",
    // });
  });
});
