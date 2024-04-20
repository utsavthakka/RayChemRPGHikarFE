import { request } from "../../api/api";

export const getRobotHistory = (params) => {
  return request.post(`getRobotHistory/`, params);
};

export const updateRobotParametersStatus = (params) => {
  return request.post(`updateRobotParametersStatus/`, params);
};

export const abortBatch = (params) => {
  return request.post(`abortBatch/`, params);
};

export const filterUid = (params) => {
  console.log("filter_search   &page=${params.page+1} ",params)
  return request.post(`filter_search/?search=${params.uid_type}&page=${params.page+1}`);
};

export const exportExcel = (params) => {
  return request.post(`exportDippingParameter/`, params);
}

export const checkbatchstatus = (params) =>{
  return request.post(`checkbatchstatus/`,params)
}