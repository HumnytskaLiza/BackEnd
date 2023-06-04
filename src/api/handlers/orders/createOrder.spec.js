const { createOrder } = require("./createOrder");
const Models = require("../../../models");

const OrdersMock = {};
const DishesMock = {};
jest.mock("../../../models", () => {
  OrdersMock.save = jest.fn();
  DishesMock.find = jest.fn();
  return {
    Orders: jest.fn().mockImplementation(() => ({
      save: OrdersMock.save,
    })),
    Dishes: {
      find: DishesMock.find,
    },
  };
});

describe("createOrder", () => {
  const res = {
    status: jest.fn().mockImplementation(() => res),
    send: jest.fn(),
  };

  describe("should return error response when", () => {
    it("quantity less than 1", async () => {
      const dishId = "646a5175679ba9696a6b0b0a";
      DishesMock.find.mockResolvedValueOnce(() => [{ _id: dishId }]);
      const req = {
        body: {
          dishes: [
            {
              dishId,
              quantity: -1,
              price: 10,
            },
          ],
        },
      };
      await createOrder(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith({
        message: `Dish with dishId:${dishId} has negative or zero quantity`,
      });
    });

    it("dish was not found in db", async () => {
      const dishId = "646a5175679ba9696a6b0b0a";
      DishesMock.find.mockResolvedValueOnce([]);
      const req = {
        body: {
          dishes: [
            {
              dishId,
              quantity: 1,
              price: 10,
            },
          ],
        },
      };
      await createOrder(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith({
        message: `Dish with dishId:${dishId} was not found`,
      });
    });

    it("dish is not available", async () => {
      const dishId = "646a5175679ba9696a6b0b0a";
      DishesMock.find.mockResolvedValueOnce([
        { _id: dishId, isAvailable: false },
      ]);
      const req = {
        body: {
          dishes: [
            {
              dishId,
              quantity: 1,
              price: 10,
            },
          ],
        },
      };
      await createOrder(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith({
        message: `Dish with dishId:${dishId} is not available`,
      });
    });
  });

  it("data will be saved in collection", async () => {
    const dishId = "646a5175679ba9696a6b0b0a";
    DishesMock.find.mockResolvedValueOnce([{ _id: dishId, isAvailable: true }]);
    const req = {
      body: {
        dishes: [
          {
            dishId,
            quantity: 1,
            price: 10,
          },
        ],
      },
    };
    const doc = {
      _id: "646a5175679ba9696a6b0b0a",
      createdAt: "2023-05-21T17:22:56.767+00:00",
      isOpen: true,
      dishes: [
        {
          dishId,
          quantity: 1,
          price: 10,
          _id: "646a5175679ba9696a6b0b0a",
        },
      ],
    };
    OrdersMock.save.mockResolvedValueOnce(doc);
    await createOrder(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(OrdersMock.save).toBeCalled();
  });
  describe("response will be correct", () => {
    it("should return 200 status code", async () => {
      const dishId = "646a5175679ba9696a6b0b0a";
      DishesMock.find.mockResolvedValueOnce([
        { _id: dishId, isAvailable: true },
      ]);
      const req = {
        body: {
          dishes: [
            {
              dishId,
              quantity: 1,
              price: 10,
            },
          ],
        },
      };
      const doc = {
        _id: "646a5175679ba9696a6b0b0a",
        createdAt: "2023-05-21T17:22:56.767+00:00",
        isOpen: true,
        dishes: [
          {
            dishId,
            quantity: 1,
            price: 10,
            _id: "646a5175679ba9696a6b0b0a",
          },
        ],
      };
      OrdersMock.save.mockResolvedValueOnce(doc);
      await createOrder(req, res);
      expect(res.status).toBeCalledWith(200);
    });

    it("should return doc from collection", async () => {
      const dishId = "646a5175679ba9696a6b0b0a";
      DishesMock.find.mockResolvedValueOnce([
        { _id: dishId, isAvailable: true },
      ]);
      const req = {
        body: {
          dishes: [
            {
              dishId,
              quantity: 1,
              price: 10,
            },
          ],
        },
      };
      const doc = {
        _id: "646a5175679ba9696a6b0b0a",
        createdAt: "2023-05-21T17:22:56.767+00:00",
        isOpen: true,
        dishes: [
          {
            dishId,
            quantity: 1,
            price: 10,
            _id: "646a5175679ba9696a6b0b0a",
          },
        ],
      };
      OrdersMock.save.mockResolvedValueOnce(doc);
      await createOrder(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.send).toBeCalledWith(doc);
    });
  });
});
