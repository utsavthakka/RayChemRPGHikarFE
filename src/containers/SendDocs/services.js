import { request } from "../../api/api";

export const getForm = (params) => {
  return request.post(`getDocument/`, params);
};
