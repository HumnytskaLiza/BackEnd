const { createOrder } = require("./createOrder");
const Models = require("../../../models");

const OrdersMock = {};
jest.mock("../../../models", () => {
  OrdersMock.save = jest.fn();
  return {
    Orders: jest.fn().mockImplementation(() => ({
      save: OrdersMock.save,
    })),
  };
});

describe("createOrder", () => {
  const res = {
    status: jest.fn().mockImplementation(() => res),
    send: jest.fn(),
  };

  describe("default value isOpen", () => {
    it("is open", async () => {
      const req = {
        body: {
          dishes: {
            dishId: "646a5175679ba9696a6b0b0a",
            quantity: 1,
            price: 10,
          },
        },
      };
      const spyOn = jest.spyOn(Models, "Orders");
      await createOrder(req, res);
      expect(spyOn.mock.calls[0]).toEqual([{ ...req.body, isOpen: true }]);
    });

    it("is closed", async () => {
      const req = {
        body: {
          dishes: {
            dishId: "646a5175679ba9696a6b0b0a",
            quantity: 1,
            price: 10,
          },
        },
      };
      const spyOn = jest.spyOn(Models, "Orders");
      await createOrder(req, res);
      expect(spyOn.mock.calls[0][2]).toEqual([{ ...req.body, isOpen: false }]);
    });
  });
});
