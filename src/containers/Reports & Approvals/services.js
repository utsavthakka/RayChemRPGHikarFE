import { request } from "../../api/api";

export const getReport = (params) => {
  return request.post(`getReport/`, params);
};

export const updateReportStatus = (params) => {
  return request.post(`updateReportStatus/`, params);
};
export const getElectricRevision = (params) => {
  return request.post(`getElectricRevision/`, params);
};
export const exportElectricExcel = (params) => {
  return request.post(`/exportElectricTest/`, params);
};
export const exportVisualExcel = (params) => {
  return request.post(`/exportVisualInspection/`, params);
};
export const exportFinalVisualExcel = (params) => {
  return request.post(`exportFinalVisualInspection/`, params);
};

export const updateFinalVisualInspectionData = (params) => {
  return request.post(`updateFinalVisualInspectionData/`, params);
};

export const getelectricdata = (params) => {
  return request.get(
    `/getelectricdata/?page=${params.page + 1}&page_size=${
      params.rowsPerPage
    }&created_at__date=${params.searchText.Date}&batch__batch_type=${
      params.searchText.B_No
    }&uid__uid_id_type=${
      params.searchText.UID
    }&electric_test_details__tested_shift__shift_name=${
      params.searchText.Shift
    }&batch__lot_number=${
      params.searchText.Lot_No
    }&batch__class_id__class_name=${
      params.searchText.Class
    }&batch__size__size_name=${params.searchText.Size}&thickness=${
      params.searchText.Thickness
    }&electric_test_details__revision_count=${
      params.searchText.electric_test_count
    }&start_datetime=${params.startDateTime}&end_datetime=${
      params.endDateTime
    }&electric_test_details__modified_at__date=${
      params.searchText.Test_date
    }&electric_test=${
      params.searchText.Test_Result == "pass"
        ? true
        : params.searchText.Test_Result == "fail"
        ? false
        : ""
    }&r_or_l=${
      params.searchText.RorL
        ? params.searchText.RorL
        : params.selectRorL == "all"
        ? ""
        : params.selectRorL
    }`
  );
};
export const getfvidata = (params) => {
  return request.get(
    `getfvidata/?page=${params.page + 1}&page_size=${
      params.rowsPerPage
    }&created_at__date=${params.searchText.Date}&batch__batch_type=${
      params.searchText.B_No
    }&uid__uid_id_type=${
      params.searchText.UID
    }&final_visual_inspection_details__tested_shift__shift_name=${
      params.searchText.Shift
    }&batch__lot_number=${
      params.searchText.Lot_No
    }&batch__class_id__class_name=${
      params.searchText.Class
    }&batch__size__size_name=${params.searchText.Size}&thickness=${
      params.searchText.Thickness
    }&uid__approval_status_fvi=${
      params.searchText.Approval_Status
    }&final_visual_inspection_details__modified_at__date=${
      params.searchText.Test_date
    }&start_datetime=${params.startDateTime}&end_datetime=${
      params.endDateTime
    }&final_visual_inspection=${
      params.searchText.Test_Result == "pass"
        ? true
        : params.searchText.Test_Result == "fail"
        ? false
        : ""
    }&r_or_l=${
      params.searchText.RorL
        ? params.searchText.RorL
        : params.selectRorL == "all"
        ? ""
        : params.selectRorL
    }`
  );
};

export const getqrprintingdata = (params) => {
  console.log(".........................", params);
  return request.get(
    `/getqrprintingdata/?page=${params.page + 1}&page_size=${
      params.rowsPerPage
    }&created_at__date=${params.searchText.Date}&batch__batch_type=${
      params.searchText.B_No
    }&uid__uid_id_type=${params.searchText.UID}&qr_printing_tested_date__date=${
      params.searchText.Test_date
    }&qr_printing_tested_shift__shift_name=${
      params.searchText.Shift
    }&batch__lot_number=${
      params.searchText.Lot_No
    }&batch__class_id__class_name=${
      params.searchText.Class
    }&batch__size__size_name=${params.searchText.Size}&thickness=${
      params.searchText.Thickness
    }&start_datetime=${params.startDateTime}&end_datetime=${
      params.endDateTime
    }&qr_printing=${
      params.searchText.Print_Result == "pass"
        ? true
        : params.searchText.Print_Result == "fail"
        ? false
        : ""
    }&r_or_l=${
      params.searchText.RorL
        ? params.searchText.RorL
        : params.selectRorL == "all"
        ? ""
        : params.selectRorL
    }`
  );
};

export const getfvidetaildata = (params) => {
  return request.post(`/getfvidetail/`, params);
};

export const getprintingdata = (pageparams) => {
  return request.get(
    `/getprintingdata/?page=${pageparams.page + 1}&page_size=${
      pageparams.rowsPerPage
    }&batch__batch_type=${pageparams.searchText.B_No}&uid__uid_id_type=${
      pageparams.searchText.UID
    }&batch__class_id__class_name=${
      pageparams.searchText.Class
    }&batch__size__size_name=${
      pageparams.searchText.Size
    }&uid_tested_shift__shift_name=${
      pageparams.searchText.Shift
    }&batch__lot_number=${pageparams.searchText.Lot_No}&created_at__date=${
      pageparams.searchText.Date
    }&start_datetime=${pageparams.startDateTime}&end_datetime=${
      pageparams.endDateTime
    }&uid_printing_tested_date__date=${
      pageparams.searchText.Test_Date
    }&uid_printing=${
      pageparams.searchText.Print_Result == "pass"
        ? true
        : pageparams.searchText.Print_Result == "fail"
        ? false
        : ""
    }&r_or_l=${
      pageparams.searchText.RorL
        ? pageparams.searchText.RorL
        : pageparams.selectRorL == "all"
        ? ""
        : pageparams.selectRorL
    }&thickness=${pageparams.searchText.Thickness}`
  );
};

export const getVisualInspectionData = (params) => {
  return request.get(
    `getVisualInspectionData/?page=${params.page + 1}&page_size=${
      params.rowsPerPage
    }&batch__batch_type=${params.searchText.B_No}&uid__uid_id_type=${
      params.searchText.UID
    }&batch__class_id__class_name=${
      params.searchText.Class
    }&batch__size__size_name=${
      params.searchText.Size
    }&visual_inspection_details__tested_shift__shift_name=${
      params.searchText.Shift
    }&batch__lot_number=${params.searchText.Lot_No}&thickness=${
      params.searchText.Thickness
    }&created_at__date=${
      params.searchText.Date
    }&visual_inspection_details__modified_at__date=${
      params.searchText.Test_date
    }&start_datetime=${params.startDateTime}&end_datetime=${
      params.endDateTime
    }&visual_inspection=${
      params.searchText.Print_Result == "pass"
        ? true
        : params.searchText.Print_Result == "fail"
        ? false
        : ""
    }&r_or_l=${
      params.searchText.RorL
        ? params.searchText.RorL
        : params.selectRorL == "all"
        ? ""
        : params.selectRorL
    }&batch__approval_status_visual_inspection=${
      params.searchText.Approve_status
    }`
  );
};

export const exportVisualInspection = (params) => {
  return request.post(`/exportVisualInspection/`, params);
};

export const getTopCount = (params) => {
  return request.post(`/GetTopCount/`, params);
};

export const exportVisualInspectionExcel = (params) => {
  return request.post(`/exportVisualInspectionExcel/`, params);
};
