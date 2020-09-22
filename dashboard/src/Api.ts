import axios from "axios";

import { AuthUser }from './types/auth';
import { PaginationParams } from './types/pagination';
import { PostWizard, UpdateWizard } from './types/wizard';
import { PostUser } from './types/user';
import { getToken } from "./services/auth";

export const AXIOS = axios.create({
  baseURL: "http://localhost:3005/",

});

AXIOS.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const endpoints = {
  wizard: '/wizard',
  user: '/users'
}

export default {
  /** USER AUTH **/
  login(user: AuthUser) {
    return AXIOS.post('/auth/login', user);
  },

  /** WIZARDS **/
  getWizards(params: PaginationParams) {
    return AXIOS.get(endpoints.wizard, {params});
  },
  getWizard(id: string) {
    return AXIOS.get(endpoints.wizard + '/' + id);
  },
  postWizard(data: PostWizard) {
    return AXIOS.post(endpoints.wizard, data);
  },
  putWizard(id: string, data: UpdateWizard) {
    return AXIOS.put(endpoints.wizard + '/' + id, data);
  },
  deleteWizard(id: string) {
    return AXIOS.delete(endpoints.wizard + '/' + id);
  },

  /** WIZARDS **/
  getUsers(params: PaginationParams) {
    return AXIOS.get(endpoints.user, {params});
  },
  getUser(id: string) {
    return AXIOS.get(endpoints.user + '/' + id);
  },
  postUser(data: PostUser) {
    return AXIOS.post(endpoints.user, data);
  },
  deleteUser(id: string) {
    return AXIOS.delete(endpoints.user + '/' + id);
  }
};
