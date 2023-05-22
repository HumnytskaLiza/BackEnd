const mongoose = require("mongoose");
const { Orders, Dishes } = require("../../../models");
const { createOrder } = require("./createOrder");

describe("createOrder", () => {
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
    const dish = await Dishes.create({
      _id: "646a5175679ba9696a6b0b0a",
      price: 10,
      isAvailable: true,
    });
    const req = {
      body: {
        isOpen: true,
        dishes: [
          {
            dishId: "646a5175679ba9696a6b0b0a",
            quantity: 4,
            price: 10,
          },
        ],
      },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockImplementation(() => res),
    };

    await createOrder(req, res);
    const _id = res.send.mock.calls[0][0]._id;
    const doc = await Orders.findById(_id);

    expect(doc).not.toBeNull();
    expect(doc.isOpen).toBe(true);
    expect(doc.dishes[0].quantity).toBe(4);
    expect(doc.dishes[0].dishId).toBe(dish._id.toString());
    expect(doc.dishes[0].price).toBe(10);
  });

  it("amount of dishes should be greater than 0", async () => {
    const req = {
      body: {
        isOpen: true,
        dishes: [
          {
            dishId: "646a5175679ba9696a6b0b0a",
            quantity: 0,
            price: 10,
          },
        ],
      },
    };

    const res = {
      send: jest.fn(),
      status: jest.fn().mockImplementation(() => res),
    };

    await createOrder(req, res);
    expect(res.status).toBeCalledWith(400);
    // expect(res.body.message).toEqual({
    //   message:
    //     "Dish with dishId:646a5175679ba9696a6b0b0a has negative or zero quantity",
    // });
  });

  it("dishId should be the same as _id of a dish", async () => {
    const req = {
      body: {
        isOpen: true,
        dishes: [
          {
            dishId: "346a5175679ba9696a6b0b0a",
            quantity: 1,
            price: 10,
          },
        ],
      },
    };

    const res = {
      send: jest.fn(),
      status: jest.fn().mockImplementation(() => res),
    };

    await createOrder(req, res);
    expect(res.status).toBeCalledWith(400);
    // expect(res.body.message).toEqual({
    //   message: "Dish with dishId:346a5175679ba9696a6b0b0a was not found",
    // });
  });

  it("dish should be available to order", async () => {
    const dish = await Dishes.create({
      _id: "646a5175679ba9696a6b0b0a",
      price: 10,
      isAvailable: false,
    });

    const req = {
      body: {
        isOpen: true,
        dishes: [
          {
            dishId: "646a5175679ba9696a6b0b0a",
            quantity: 1,
            price: 10,
          },
        ],
      },
    };

    const res = {
      send: jest.fn(),
      status: jest.fn().mockImplementation(() => res),
    };

    await createOrder(req, res);
    expect(res.status).toBeCalledWith(400);
    // expect(res.body.message).toEqual({
    //   message: "Dish with dishId:646a5175679ba9696a6b0b0a is not available",
    // });
  });
});
