import { multipartRequest, request } from "../../api/api";

export const advanceAnalyticsReport = (params) => {
  return request.post(`/advanceAnalyticsReport/`, params);
};

export const ETQualityClassWiseYieldCount = (params) => {
  return request.post(`/ETQualityClassWiseYieldCount/`, params);
};

export const visualClassWiseYieldCount = (params) => {
  return request.post(`/VIQualityClassWiseYieldCount/`, params);
};

export const finalVisualClassWiseYieldCount = (params) => {
  return request.post(`/FVIQualityClassWiseYieldCount/`, params);
};

export const advanceAnalyticsProductionReport = (params) => {
  return multipartRequest.post(`/advanceAnalyticsProductionReport/`, params);
};

export const salesSummaryReport = (params) => {
  return multipartRequest.post(`/salesSummaryReport/`, params);
};

export const qualityReport = (params) => {
  return request.post(`/qualityReport/`, params);
};

export const visualInspectionClassWiseSummaryReport = (params) => {
  return multipartRequest.post(
    `/visualInspectionClassWiseSummaryReport/`,
    params
  );
};

export const generateETQualityClassWiseYieldReport = (params) => {
  return request.post(`/generateETQualityClassWiseYieldReport/`, params);
};

export const getProductionSummryCount = (params) => {
  return multipartRequest.post(`/getProductionSummryCount/`, params);
};

export const finalVisualInspectionClassWiseSummaryReport = (params) => {
  return multipartRequest.post(
    `/finalVisualInspectionClassWiseSummaryReport/`,
    params
  );
};

export const productiondata = (params) => {
  return request.post(`/productiondata/`, params);
};

export const ETandVIQualityElectricTest = (params) => {
  return request.post(`/ETandVIQualityElectricTest/`, params);
};

export const advanceAnalyticsQualityElectricTest = (params) => {
  return request.post(`/advanceAnalyticsQualityElectricTest/`, params);
};

export const AdvanceAnalyticsQualityElectricTest = (params) => {
  return request.post(`/advanceAnalyticsQualityElectricTest/`, params);
};

export const productionTotalAcceptedPairsReport = (params) => {
  return request.post(`/productionTotalAcceptedPairsReport/`, params);
};

export const electricTestRejectionChartReport = (params) => {
  return request.post(`/electricTestRejectionChartReport/`, params);
};

export const visualInspectionQualityAnalyticsReport = (params) => {
  return request.post(`/visualInspectionQualityAnalyticsReport/`, params);
};

export const electricTestQualityAnalyticsReport = (params) => {
  return request.post(`/electricTestQualityAnalyticsReport/`, params);
};

export const finalVisualInspectionQualityAnalyticsReport = (params) => {
  return request.post(`/finalVisualInspectionQualityAnalyticsReport/`, params);
};

export const getAdvanceAnalyticsSummryCount = (params) => {
  return request.post(`/getAdvanceAnalyticsSummryCount/`, params);
};

export const getAdvanceAnalyticsQualityVisual = (params) => {
  return request.post(`/advanceAnalyticsQualityVisual/`, params);
};

export const getAdvanceAnalyticsQualityFinal = (params) => {
  return request.post(`/advanceAnalyticsQualityFinalVisual/`, params);
};
