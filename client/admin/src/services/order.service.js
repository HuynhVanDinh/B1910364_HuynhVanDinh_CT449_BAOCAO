import createApiClient from "./api.service";

class OrderService {
  constructor(baseUrl = "/api/allOrders") {
    this.api = createApiClient(baseUrl);
  }
  async addOrder(id, data) {
    console.log("kk", id, data);
    return (await this.api.post(`/${id}`, data)).data;
  }
  async findAll() {
    return (await this.api.get("/")).data;
  }
}

export default new OrderService();
