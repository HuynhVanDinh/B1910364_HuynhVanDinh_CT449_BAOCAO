const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
// const ServiceProvider = require("../controllers/serviceProvider.controller");

class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }
  async extractUserData(payload) {
    const hashPass = await bcrypt.hash(payload.password, 10);
    const user = {
      username: payload.username,
      password: hashPass,
      fullname: payload.fullname,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      orders: payload.orders || [],
      admin: 0,
    };

    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );
    return user;
  }

  async create(payload) {
    const user = await this.extractUserData(payload);
    const result = await this.User.insertOne(user);
    return result.insertedId;
  }

  async findUsername(username) {
    const user = await this.User.findOne({ username: username, admin: 0 });
    return user;
  }
  async findAdmin(username) {
    const user = await this.User.findOne({ username: username, admin: 1 });
    console.log("hi", user);
    return user;
  }
  async find(filter) {
    const cursor = await this.User.find({ admin: { $ne: 1 }, ...filter });
    return await cursor.toArray();
  }
  async findById(id) {
    return await this.User.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async findByIdUser(userId) {
    return await this.User.findOne({ _id: new ObjectId(userId) });
  }

  extractOrderData1(payload) {
    const order = {
      _id: new ObjectId(),
      order_date: new Date(),
      event_date: payload.event_date,
      menus: payload || [],
      address_book: payload.address_book,
      total: payload.total,
      status: "0",
    };
    return order;
  }
  async createOrder1(userId, payload) {
    const order = await this.extractOrderData1(payload);
    const menu1 = order.menus;
    const result = await this.User.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { orders: { ...order, menus: menu1 } } }
    );
    console.log("Đã thêm vào hoá đơn rồi");
  }

  extractOrderData(payload) {
    const order = {
      _id: new ObjectId(),
      order_date: new Date(),
      menus: payload.menus || [],
      address_book: payload.address_book,
      total: payload.total,
      status: "0",
    };
    return order;
  }
  async createOrder(userId, payload) {
    const order = await this.extractOrderData(payload);
    const menu1 = JSON.parse(order.menus);
    const result = await this.User.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { orders: { ...order, menus: menu1 } } }
    );
    console.log("Đã thêm vào hoá đơn rồi");
  }
  //Tìm hoá đơn dựa theo id hoá đơn của bệnh nhân
  async findIdOrder(userId, orderId) {
    const user = await this.User.findOne({
      _id: new ObjectId(userId),
    });
    const order = user.orders.find((o) => o._id.toString() === orderId);
    return order;
  }

  //Tìm tất cả các hoá đơn của bệnh nhân
  async findAllOrders() {
    //
    const orders = await this.User.aggregate([
      {
        $unwind: "$orders",
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          fullname: "$fullname",
          email: "$email",
          phone: "$phone",
          order: "$orders",
        },
      },
    ]).toArray();
    return orders;
  }

  async findAllOrdersUnconfirm() {
    const orders = await this.User.aggregate([
      {
        $unwind: "$orders",
      },
      {
        $match: {
          "orders.status": "0",
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          fullname: "$fullname",
          email: "$email",
          phone: "$phone",
          order: "$orders",
        },
      },
    ]).toArray();
    return orders;
  }

  //Tìm 1 order dựa trên id của order đó:
  async findOrderById(orderId) {
    const orders = await this.findAllOrders();
    const order = orders.find((o) => o.order._id == orderId);
    return order;
  }

  async updateOrderStatus(userId, orderId) {
    const result = await this.User.updateOne(
      { _id: new ObjectId(userId), "orders._id": new ObjectId(orderId) },
      { $set: { "orders.$.status": "1" } }
    );
    console.log("rs", result);
    return result.modifiedCount;
  }

  extractMenuData(payload) {
    const menu = payload.menus.map((item) => {
      const menuItem = {
        id: item.id,
        service_name: item.service_name,
        price: item.price,
        quantity: item.quantity,
      };
      return menuItem;
    });
    return menu;
  }

  //Dùng để lấy thông tin cá nhân
  async findAllOfUser(userId) {
    const user = await this.User.findOne({
      _id: new ObjectId(userId),
    });
    return user;
  }
  //cap nhat thong tin ca nhân
  async updateUserInfo(userId, newInfo) {
    const result = await this.User.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          fullname: newInfo.fullname,
          email: newInfo.email,
          phone: newInfo.phone,
          address: newInfo.address,
        },
      }
    );
    console.log(result);
    return result.acknowledged;
  }

  //tìm các hoá đơn của bệnh nhân
  async findAllOrdersOfUser(userId) {
    const user = await this.User.findOne({
      _id: new ObjectId(userId),
    });
    return user.orders;
  }
}

module.exports = UserService;
