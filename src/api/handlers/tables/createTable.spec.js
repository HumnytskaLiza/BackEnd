const { createTable } = require("./createTable");
const Models = require("../../../models");

const TablesMock = {};
jest.mock("../../../models", () => {
  TablesMock.save = jest.fn();
  return {
    Tables: jest.fn().mockImplementation(() => ({
      save: TablesMock.save,
    })),
  };
});

describe("createTable", () => {
  const res = {
    status: jest.fn().mockImplementation(() => res),
    send: jest.fn(),
  };

  it("data will be save in collection", async () => {
    const req = { body: { tableId: 5 } };
    await createTable(req, res);
    expect(TablesMock.save).toBeCalled();
  });

  /*
    it("tableId is null", async () => {
    const req = { body: {} };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockImplementation(() => res),
    };

    await createTable(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.send).toBeCalledWith({
      message: "Parameter tableId is required",
    });
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
    expect(res.send).toBeCalledWith({
      message: `Table with id:${} already exists`,
    });
  });
  */
});
