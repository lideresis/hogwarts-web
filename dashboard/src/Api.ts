import axios from "axios";
import { AuthUser }from './types/auth';

export const AXIOS = axios.create({
  baseURL: "http://localhost:3005/",

});

export default {
  /** USER AUTH **/
  login(user: AuthUser) {
    return AXIOS.post("/auth/login", user);
  },

  /** WIZARDS **/
  getWizards() {
    return AXIOS.get("/wizard");
  },
};
