import { request } from "../../api/api";

export const loginAPI = (params) => {
  return request.post(`/logIn/`, params);
};
export const forgotPasswordAPI = (params) => {
  return request.post(`/forgotPassword/`, params);
};
export const verifyOtpAPI = (params) => {
  return request.post(`/verifyOtp/`, params);
};
export const updatePasswordAPI = (params) => {
  return request.post(`/updatePassword/`, params);
};
