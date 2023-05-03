import createApiClient from "./api.service";
class AcceptOrder {
  constructor(baseUrl = "/api/allOrders") {
    this.api = createApiClient(baseUrl);
  }
  async accept(userId, orderId) {
    return (await this.api.get(`/${userId}/${orderId}`)).data;
  }
}

export default new AcceptOrder();
