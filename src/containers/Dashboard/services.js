import { request } from "../../api/api";

export const getOrderDetail = (searchParams) => {
  return request.get(`/getOrderDetail/?page=${searchParams.page + 1}&page_size=${searchParams.rowsPerPage}`);
};

export const uploadFileExcel = (formdata) => {
  return request.post(`uploadFile/`, formdata);
};

export const getUploadFile = () => {
  return request.get(`/getUploadFile/`);
};
export const filterOrderDetail = (params) => {
  return request.get(
    `/filterOrderDetail/?status=${params.searchText.Status}&days_left=${params.searchText.Days_Left}&order_id=${params.searchText.Order_ID}&customer_name=${params.searchText.Customer_Name}&order_quantity=${params.searchText.Order_Qty}&paired_quantity=${params.searchText.Paired_Qty}&Packed_Qty=${params.searchText.Packed_Qty}&page=${params.page + 1}&page_size=${params.rowsPerPage}`
  );
};

export const getPrintedBoxDetails = (params,search) => {
  return request.post(`dispatch/getPrintedBoxDetails/?search=${search.Uid}&pairing__order_id__order_item_code__description=${search.ProductDescription}&pairing__order_id__order_id=${search.OrderNo}&pairing__order_id__order_item_code__ordered_item=${search.OrderID}`,params);
};

export const getBoxNo = () => {
  return request.get(`/dispatch/getBoxNo/`);
};
export const getBoxLabelPrintHistory = (params) => {
  if(params.DateofPrinting && !params.Time){
    return request.get(
      `/dispatch/getBoxPrintHistory/?search=${params.DateofPrinting}&shift__shift_name=${params.Shift}&customer_order__ordered_item=${params.OrderID}&box_no__box_no=${params.BoxNo}&box_no__no_of_prints=${params.NumberofPrints}&user__username=${params.User}&page=${params.Page + 1}&page_size=${params.Page_size}&order_number__order_id=${params.order_number}&order_number__customer_name=${params.CustomerName}`
    );
  }else{
    return request.get(
      `/dispatch/getBoxPrintHistory/?search=${params.Time}&shift__shift_name=${params.Shift}&customer_order__ordered_item=${params.OrderID}&box_no__box_no=${params.BoxNo}&box_no__no_of_prints=${params.NumberofPrints}&user__username=${params.User}&page=${params.Page + 1}&page_size=${params.Page_size}&order_number__order_id=${params.order_number}&order_number__customer_name=${params.CustomerName}`
    );

  }
  
 
};


export const createBoxLabel = async (params) => {
  return await request.post(`/dispatch/createBoxLabel/`, params);
};


export const PrintAgainBoxLabel = async (params) => {
  return await request.post(`/dispatch/printAgainBoxLabel/`, params);
};

export const printAgainBoxLabel = async (params) => {
  return await request.post(`dispatch/printAgainBoxLabel/`, params);
};

export const getOrderYear = () => {
  return request.get(`getOrderYear/`);
};

export const yearsOrder = async (params) => {
  return await request.post(`yearsOrder/`, params);
};

export const getOrderbyType = (params) => {
  return request.post(`getOrderbyType/`, params);
};

export const exportProduction = (params) => {
  return request.post(`exportProduction/`, params);
};

export const getColorFilter = () => {
  return request.get(`getColorFilter/`);
};



export const getOrderbyFilter = (params) => {
  return request.post(
    `/getOrderbyFilter/?class_id__class_name=${params.class_id__class_name}&size__size_name=${params.size__size_name}&type__gloves_type_name=${params.type__gloves_type_name}&cuff__cuff_name=${params.cuff__cuff_name}&length=${params.length}&color=${params.color}&year=${params.year}&order_type=${params.order_type}`,
    params
  );
};

export const getCustomerNameList = ()=>{
  return request.get('dispatch/getCustomerNameList/')
}

export const getDispatchOrderDetail = (params)=>{
  return request.post('dispatch/getDispatchOrderDetail/',params)
}
