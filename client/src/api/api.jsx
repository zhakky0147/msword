import axios from "axios";

axios.defaults.baseURL = "/";

export default class API {
  //detail
  static createDetail = async (data) => {
    try {
      const res = await axios.post(`/api/v1/detail`, data);
      return res;
    } catch (error) {
      return error?.response?.data;
    }
  };
}
