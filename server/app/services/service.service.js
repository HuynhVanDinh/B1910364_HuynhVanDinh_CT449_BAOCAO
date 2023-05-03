const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");

class ServiceService {
  constructor(client) {
    this.Service = client.db().collection("services");
  }

  async extractServiceData(payload) {
    const service = {
      service_name: payload.service_name,
      service_categories: payload.service_categories,
      price: payload.price,
      image: payload.image ? payload.image : "",
    };

    //Remove undefined fields
    Object.keys(service).forEach(
      (key) => service[key] === undefined && delete service[key]
    );
    console.log("return", service);
    return service;
  }

  async create(payload) {
    const service = await this.extractServiceData(payload);
    const result = await this.Service.insertOne(service);
    return result;
  }
  async find(filter) {
    const cursor = await this.Service.find(filter);
    return await cursor.toArray();
  }
  async findByName(service_name) {
    return await this.find({
      service_name: { $regex: new RegExp(service_name), $options: "i" },
    });
  }
  async findById(id) {
    return await this.Service.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = await this.extractServiceData(payload);
    const result = await this.Service.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    console.log("rs", result);
    return result.value;
  }

  async delete(id) {
    const result = await this.Service.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
}

module.exports = ServiceService;
