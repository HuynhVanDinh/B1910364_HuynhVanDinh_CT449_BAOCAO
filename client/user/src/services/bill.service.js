import createApiClient from "./api.service";
class Patientservice {
  constructor(baseUrl = "/api/patients") {
    this.api = createApiClient(baseUrl);
  }
  async addOrder(data) {
    return (await this.api.post("/", data)).data;
  }
  async historyBill() {
    return (await this.api.get("/")).data;
  }
}

export default new Patientservice();
