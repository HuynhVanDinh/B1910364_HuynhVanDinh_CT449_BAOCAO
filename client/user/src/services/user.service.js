import createApiClient from "./api.service";
class UserService {
  constructor(baseUrl = "/api/users") {
    this.api = createApiClient(baseUrl);
  }
  async register(data) {
    return (await this.api.post("/register", data)).data;
  }
  async login(data) {
    return (await this.api.post("/login", data)).data;
  }
  async logout() {
    return (await this.api.post("/logout")).data;
  }
}

export default new UserService();
