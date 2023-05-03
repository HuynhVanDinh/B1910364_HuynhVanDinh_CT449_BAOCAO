import createApiClient from "./api.service";

class OrderGetItemService {
  constructor(baseUrl = "/api/patients") {
    this.api = createApiClient(baseUrl);
  }
  async getOrder() {
    return (await this.api.get("/getOrder")).data;
  }
  async addOrder(id, data) {
    return (await this.api.post(`/${id}`, data)).data;
  }
}

export default new OrderGetItemService();
