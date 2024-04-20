import { request } from "../../api/api";

export const getDocReport = (params) => {
  return request.post(`/getDocReport/`,params)
}