import http from "@/api/no-auth.config";

class Auth {
  login(payload) {
    return http.post("auth/signin", payload);
  }
}

export default new Auth();
