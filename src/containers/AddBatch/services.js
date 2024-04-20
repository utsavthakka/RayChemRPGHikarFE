import { request } from "../../api/api";

export const getClasses = () => {
  return request.get(`getClasses/`);
};
export const getSizes = () => {
  return request.get(`getSizes/`);
};
export const getBatch = (searchParams) => {
  return request.get(`getBatch/?search=${searchParams.search.Date}&batch_type=${searchParams.search.B_No}&lot_number=${searchParams.search.Lot_No}&scre=${searchParams.search.Scre}&class_id__class_name=${searchParams.search.Class}&size__size_name=${searchParams.search.Size}&page=${searchParams.page + 1}&page_size=${searchParams.rowsPerPage}`);
};

export const getBatchdata = (search) => {
  return request.get(
    `getBatch/?search=${search.Date}&batch_type=${search.B_No}&lot_number=${search.Lot_No}&class_id__class_name=${search.Class}&size__size_name=${search.Size}&thickness=${search.Thickness}&approval_status_visual_inspection=${search.Approval_Status}`
  );
};

export const getElectricBatchdata = (search) => {
  return request.get(
    `getBatch/?search=${search.Date}&batch_type=${search.B_No}&lot_number=${search.Lot_No}&class_id__class_name=${search.Class}&size__size_name=${search.Size}&thickness=${search.Thickness}`
  );
};

export const getFinalVisualBatchdata = (search) => {
  return request.get(
    `getBatch/?search=${search.Date}&batch_type=${search.B_No}&lot_number=${search.Lot_No}&class_id__class_name=${search.Class}&size__size_name=${search.Size}&thickness=${search.Thickness}&approval_status_final_visual=${search.Approval_Status}`
  );
};

export const postBatch = (params) => {
  return request.post(`addBatch/`, params);
};
export const uidPostBatch = (param1) => {
  return request.post(`getStartUid/`, param1);
};
export const getGlovesTypes = () => {
  return request.get(`getGlovesTypes/`);
};
export const editBatch = (batchId,params)=>{
  return request.put(`editbatch/${batchId}/`,params)
}