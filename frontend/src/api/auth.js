// api/auth.js

import axiosClient from "./axiosClient";

const authApi = {
  login: function (email, password) {
    return axiosClient.post("/auth/login", { email, password });
  },

  logout: function () {
    return Promise.resolve();
  },
};

export default authApi;
