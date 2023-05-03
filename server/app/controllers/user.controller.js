const UserService = require("../services/user.service");

const { client } = require("../utils/mongodb.util");

const MongoDB = require("../utils/mongodb.util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb");

exports.create = async (req, res, next) => {
  if (!req.body?.username) {
    return next(new ApiError(400, "Username can not be empty"));
  }

  if (!req.body?.password) {
    return next(new ApiError(400, "Password can not be empty"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the User11111")
    );
  }
};

exports.login = async (req, res, next) => {
  console.log(req.body);
  if (!req.body?.username || !req.body?.password) {
    return next(new ApiError(400, "Input username/password"));
  }
  try {
    const userService = new UserService(MongoDB.client);
    const user = await userService.findUsername(req.body.username);
    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!user) {
      return next(new ApiError(401, "Username notfound"));
    } else if (!comparePass) {
      return next(new ApiError(400, "password fail"));
    } else {
      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: 864000 });
      return res.send({
        status: "success",
        message: "Login successfully",
        token: token,
      });
    }
  } catch (error) {
    return next(new ApiError(500, "Login error"));
  }
};

exports.loginadmin = async (req, res, next) => {
  console.log(req.body);
  if (!req.body?.username || !req.body?.password) {
    return next(new ApiError(400, "Input username/password"));
  }
  try {
    const userService = new UserService(MongoDB.client);
    const user = await userService.findAdmin(req.body.username);
    const comparePass = await bcrypt.compare(req.body.password, user.password);
    console.log(user);
    if (!user) {
      return next(new ApiError(401, "Username notfound"));
    } else if (!comparePass) {
      return next(new ApiError(400, "password fail"));
    } else {
      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: 864000 });
      console.log("token", token);
      return res.send({
        status: "success",
        message: "Login successfully",
        token: token,
      });
    }
  } catch (error) {
    return next(new ApiError(500, "Login error"));
  }
};

exports.logout = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    console.log(auth);
    if (!auth) {
      return next(new ApiError(401, "Unauthorized"));
    }
    const token = auth.split(" ")[1];
    const decoded_user = jwt.decode(token);
    console.log("decoded: ", decoded_user);
    return res.send({ message: "Logout success" });
  } catch (error) {
    return next(new ApiError(500, "logout fail"));
  }
};

//Cap nhat thong tin ca nhan
exports.updateInfo = async (req, res, next) => {
  const userId = req.user.id;
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    console.log(userId);
    console.log(req.body);
    const document = await userService.updateUserInfo(userId, req.body);
    console.log(document);
    if (!document) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send({ message: "InfoOfUser was updated successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error updating user with userid=${userId}`));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const userService = new UserService(MongoDB.client);
    const { username } = req.query;
    if (username) {
      documents = await userService.findByName(username);
    } else {
      documents = await userService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occured while retrieving disease!")
    );
  }

  return res.send(documents);
};
// phần hoá đơn

exports.findOneOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    console.log("conta", orderId);

    const userService = new UserService(MongoDB.client);
    const user = await userService.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    const order = await userService.findIdOrder(userId, orderId);
    console.log("findOne", order);
    if (!order) {
      return next(new ApiError(404, "order not found"));
    }
    return res.send(order);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving the order")
    );
  }
};

//Tìm bệnh nhân chỉ dựa vào id

exports.findOneOrderAdmin = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    console.log("conta", orderId);

    const userService = new UserService(MongoDB.client);
    const order = await userService.findOrderById(orderId);
    console.log("findOne", order);
    if (!order) {
      return next(new ApiError(404, "order not found"));
    }
    return res.send(order);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving the order")
    );
  }
};

//xác nhận thanh toán

exports.acceptOrder = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("userId", userId);
    const orderId = req.params.orderId;
    const userService = new UserService(MongoDB.client);
    const order = await userService.findOrderById(orderId);
    if (!order) {
      return next(new ApiError(404, "order not found"));
    }
    console.log("findOne", order);
    const status = await userService.updateOrderStatus(userId, orderId);
    return res.send(order);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving the order")
    );
  }
};

exports.findAllOrders = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const patients = await userService.findAllOrders();
    console.log("can tim", patients);
    return res.send(patients);
  } catch (error) {
    return next(new ApiError(500, "Error find All order"));
  }
};

//Lấy số lượng đơn hàng chưa duyệt

exports.getOrderUnconfirm = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const patients = await userService.findAllOrdersUnconfirm();
    console.log("can tim", patients);

    const rs = patients.length;
    console.log(rs);
    return res.send(patients);
  } catch (error) {
    return next(new ApiError(500, "error get order uncomfirm"));
  }
};

exports.findAllOrdersOfUser = async (req, res, next) => {
  let patients = [];
  try {
    const userId = req.user.id;
    console.log("iduser", userId);
    const userService = new UserService(MongoDB.client);
    const user = await userService.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    // const contactUserService = new ContactUserService(MongoDB.client);
    patients = await userService.findAllOrdersOfUser(userId);
    return res.send(patients);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving patients")
    );
  }
};

exports.findAllOfUser = async (req, res, next) => {
  let patients = [];
  try {
    const userId = req.user.id;
    console.log("iduser", userId);
    const userService = new UserService(MongoDB.client);
    const user = await userService.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    // const contactUserService = new ContactUserService(MongoDB.client);
    patients = await userService.findAllOfUser(userId);
    return res.send(patients);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving patients")
    );
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userService = new UserService(MongoDB.client);
    const user = await userService.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    console.log("payload: ", req.body);
    const addContact = await userService.createOrder(userId, req.body);
    return res.send(addContact);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

exports.addOrder1 = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userService = new UserService(MongoDB.client);
    const user = await userService.findById(userId);
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    const addContact = await userService.createOrder1(userId, req.body);
    return res.send(addContact);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while creating the bill"));
  }
};

// exports.deleteAll = async (req, res, next) => {
//   const userId = req.user.id;

//   try {
//     const userService = new UserService(MongoDB.client);
//     const deleteAll = await userService.deleteAll(userId);
//     return res.send({ message: "Delete All contact success" });
//   } catch (error) {
//     return next(
//       new ApiError(500, "An error occurred while deleteall the bill")
//     );
//   }
// };
// exports.deleteOneContact = async (req, res, next) => {
//   const userId = req.user.id;
//   const contactId = req.params;
//   try {
//     const userService = new UserService(MongoDB.client);
//     const deleteOne = await userService.deleteOneContact(userId, contactId);
//     if (!deleteOne) {
//       return next(new ApiError(404, "contact not found"));
//     }
//     return res.send({ message: "Delete success" });
//   } catch (error) {
//     return next(
//       new ApiError(500, "An error occurred while delete the contact")
//     );
//   }
// };

// exports.updateOneContact = async (req, res, next) => {
//   const userId = req.user.id;
//   const contactId = req.params;
//   const { name, email, phone } = req.body;
//   if (!name) {
//     return next(new ApiError(400, "Name can not be empty"));
//   }

//   try {
//     const userService = new UserService(MongoDB.client);
//     const document = await userService.updateOneContact(
//       userId,
//       contactId,
//       req.body
//     );
//     if (!document) {
//       return next(new ApiError(404, "Contact not found"));
//     }
//     return res.send(document);
//   } catch (error) {
//     return next(
//       new ApiError(500, "An error occurred while updating the contact")
//     );
//   }
// };
