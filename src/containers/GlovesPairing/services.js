import { request } from "../../api/api";

export const pairingdata = (params) => {
  return request.post(`/getParringData/`, params);
};

export const checkParringStatus = (params) => {
  return request.post(`checkParringStatus/`, params);
};

export const getcuff = () => {
  return request.get(`getCuff/`);
};

export const getLastpairingData = () => {
  return request.get(`/getLastpairingData/`);
};

export const getPairingGlovesType = () => {
  return request.get(`getPairingGlovesType/`);
};

export const getParingLength = () => {
  return request.get(`getParingLength/`);
};
export const getLotNumber = (params) => {
  return request.post(`getLotNumber/`, params);
};

export const getpairedData = (searchParams) => {
  console.log("searchParams in url", searchParams);
  let queryParams = [
    searchParams.search.UID ? `search=${searchParams.search.UID}` : "",
    searchParams.search.LotNumber
      ? `&lot_number=${searchParams.search.LotNumber}`
      : "",
    searchParams.search.Class
      ? `class_id__class_name=${searchParams.search.Class}`
      : "",
    searchParams.search.Size
      ? `size__size_name=${searchParams.search.Size}`
      : "",
    searchParams.search.Scre
      ? `cuff__cuff_name=${searchParams.search.Scre}`
      : "",
    searchParams.search.Length
      ? `length__length=${parseInt(searchParams.search.Length)}`
      : "",
    searchParams.search.GlovesType
      ? `types_of_gloves__pairing_gloves_type_name=${searchParams.search.GlovesType}`
      : "",
    searchParams.search.Order_No
      ? `order_id__order_id=${searchParams.search.Order_No}`
      : "",
    searchParams.search.Date
      ? `created_at__date=${searchParams.search.Date}`
      : "",
  ]
    .filter((param) => param !== "")
    .join("&");

  return request.get(
    `getPairing/?${queryParams}&${
      searchParams.rowsPerPage ? `page_size=${searchParams.rowsPerPage}` : ""
    }&page=${searchParams.page + 1}`
  );
};

export const createPairing = (params) => {
  return request.post(`createPairing/`, params);
};

export const getCustomerName = (params) => {
  return request.post(`/getCustomerName/`, params);
};

export const getOrderId = (params) => {
  return request.post(`getOrderId/`, params);
};

export const getOrderIdParring = (params) => {
  return request.post(`/getOrderIdParring/`, params);
};

export const getPrintHistory = (params) => {
  if (params.PackingStatus) {
    params.PackingStatus.match("YES")
      ? (params.PackingStatus = true)
      : (params.PackingStatus = false);

    return request.get(
      `/printing/getPrintHistory/?search=${
        params.created_at || params.UID || params.created_at_time
      }&pairing__order_id__order_id=${params.OrderNo}&shift__shift_name=${
        params.Shift
      }&pairing__order_id__customer_name=${
        params.CustomerName
      }&pairing__order_id__order_item_code__ordered_item=${
        params.OrderID
      }&no_of_prints=${params.NumberofPrints}&user__username=${
        params.User
      }&packing_status=${params.PackingStatus}&page=${
        params.page + 1
      }&page_size=${params.page_size}`
    );
  } else {
    return request.get(
      `/printing/getPrintHistory/?search=${
        params.created_at || params.UID  || params.created_at_time
      }&pairing__order_id__order_id=${params.OrderNo}&shift__shift_name=${
        params.Shift
      }&pairing__order_id__customer_name=${
        params.CustomerName
      }&pairing__order_id__order_item_code__ordered_item=${
        params.OrderID
      }&no_of_prints=${params.NumberofPrints}&user__username=${
        params.User
      }&packing_status=${params.PackingStatus}&page=${
        params.page + 1
      }&page_size=${params.page_size}`
    );
  }
};

export const PrintAgain = (params) => {
  return request.post(`/printing/printAgain/`, params);
};
