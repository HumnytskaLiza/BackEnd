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
});
