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
    expect(doc.dishes[0].dishId.toString()).toBe(dish._id.toString());
    expect(doc.dishes[0].price).toBe(10);
  });
});
