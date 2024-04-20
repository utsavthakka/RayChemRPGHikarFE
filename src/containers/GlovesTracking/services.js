import { request } from "../../api/api";

export const print = (params) => {
  return request.post(`/print/`, params);
};

export const visualInspectionReport = (params) => {
  return request.post(`/get_visual_inspection_report/`, params);
}

export const electricTestReport = (params) => {
  return request.post(`/get_electric_test_report/`, params);
}

export const finalVisualInspectionReport = (params) => {
  return request.post(`/get_final_visual_inspection_report/`, params);
}