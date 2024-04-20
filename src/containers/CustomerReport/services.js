import { request } from "../../api/api";

export const generateBatchReport = (params) => {
  return request.post(`/generateBatchReport/`,params);
};