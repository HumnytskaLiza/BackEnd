const { createTable } = require("./createTable");

const TablesMock = {};
jest.mock("../../../models", () => {
  TablesMock.save = jest.fn();
  TablesMock.find = jest.fn();
  return {
    Tables: jest.fn().mockImplementation(() => ({
      save: TablesMock.save,
    })),
    Tables: {
      find: TablesMock.find,
    },
  };
});

describe("createTable", () => {
  const res = {
    status: jest.fn().mockImplementation(() => res),
    send: jest.fn(),
  };

  describe("should return error response when", () => {
    it("tableId is null", async () => {
      const req = { body: {} };
      await createTable(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith({
        message: "Parameter tableId is required",
      });
    });
    it("table already exists", async () => {
      const tableId = 5;
      TablesMock.find.mockResolvedValueOnce([
        {
          tableId,
        },
      ]);
      const req = { body: { tableId } };
      await createTable(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith({
        message: `Table with id ${tableId} already exists`,
      });
    });
  });

  it("data will be saved in collection", async () => {
    const tableId = 5;
    TablesMock.find.mockResolvedValueOnce([]);
    const req = { body: { tableId } };
    const doc = {
      _id: "646a5175679ba9696a6b0b0a",
      tableId,
    };
    TablesMock.save.mockResolvedValueOnce(doc);
    await createTable(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(TablesMock.save).toBeCalled();
  });

  describe("response will be correct", () => {
    it("should return 200 status code", async () => {
      const req = { body: { tableId: 5 } };
      const doc = {
        _id: "646a5175679ba9696a6b0b0a",
        tableId: 5,
      };
      TablesMock.save.mockResolvedValueOnce(doc);
      await createTable(req, res);
      expect(res.status).toBeCalledWith(200);
    });
    it("should return doc from collection", async () => {
      const req = { body: { tableId: 5 } };
      const doc = {
        _id: "646a5175679ba9696a6b0b0a",
        tableId: 5,
      };
      TablesMock.save.mockResolvedValueOnce(doc);
      await createTable(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith(doc);
    });
  });
});
