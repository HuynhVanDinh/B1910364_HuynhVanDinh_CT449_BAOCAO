import createApiClient from "./api.service";
class InfoService {
  constructor(baseUrl = "/api/info") {
    this.api = createApiClient(baseUrl);
  }

  async info() {
    return (await this.api.get("/")).data;
  }

  async update(data) {
    return (await this.api.post("/", data)).data;
  }
}

export default new InfoService();
