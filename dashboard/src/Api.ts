import axios from "axios";

import { AuthUser }from './types/auth';
import { PaginationParams } from './types/pagination';
import { PostWizard, UpdateWizard } from './types/wizard';

export const AXIOS = axios.create({
  baseURL: "http://localhost:3005/",

});

const endpoints = {
  wizard: '/wizard'
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
  }
};
