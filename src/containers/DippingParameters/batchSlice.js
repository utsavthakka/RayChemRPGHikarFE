import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { request } from "../../api/api";
import {
  getBatch,
  getBatchdata,
  getElectricBatchdata,
  getFinalVisualBatchdata,
  getGlovesTypes,
} from "../AddBatch/services";
import {
  filterOrderDetail,
  getOrderDetail,
  getUploadFile,
} from "../Dashboard/services";
import { getpairedData } from "../GlovesPairing/services";
import {
  getelectricdata,
  getfvidata,
  getprintingdata,
  getqrprintingdata,
  getVisualInspectionData,
} from "../Reports & Approvals/services";

// This creates an async thunk that fetches all batch requests
export const fetchAllBatch = createAsyncThunk(
  "batch/fetchAllRequests",
  async (searchParams) => {
    const resp = await getBatch(searchParams);
    return resp.data;
  }
);

export const fetchAllBatchData = createAsyncThunk(
  "batch/fetchAllBatchData",
  async (search) => {
    const resp = await getBatchdata(search);
    return resp.data;
  }
);

export const fetchElectricBatchData = createAsyncThunk(
  "batch/fetchElectricBatchData",
  async (search) => {
    const resp = await getElectricBatchdata(search);
    return resp.data;
  }
);

export const fetchFinalVisualBatchData = createAsyncThunk(
  "batch/fetchFinalVisualBatchData",
  async (search) => {
    const resp = await getFinalVisualBatchdata(search);
    return resp.data;
  }
);

export const fetchpairedBatch = createAsyncThunk(
  "batch/fetchpairedBatchRequests",
  async (search) => {
    const resp = await getpairedData(search);
    return resp.data;
  }
);
export const updateRobotStatus = createAsyncThunk(
  "r1r2status/updateRobotStatus",
  async (params) => {
    const resp = await request.post(`updateRobotStatus/`, params);
    return resp.data;
  }
);

export const getBatchTestAutoPullData = createAsyncThunk(
  "batchTest/getBatchTestAutoPullData",
  async (params) => {
    const resp = await request.post(`getBatchTestAutoPullData/`, params);
    return resp.data;
  }
);

export const getBatchTestReport = createAsyncThunk(
  "getBatchTest/getBatchTestReport",
  async (searchParams) => {
    const resp = await request.get(
      `getBatchTestReport/?page=${searchParams.page + 1}&page_size=${
        searchParams.rowsPerPage
      }`
    );
    return resp.data;
  }
);

export const getRobotStatus = createAsyncThunk(
  "r1r2status/getRobotStatus",
  async () => {
    const resp = await request.get(`getRobotStatus/`);
    return resp.data;
  }
);

export const getDocumentForm = createAsyncThunk(
  "documentUid/getDocumentForm",
  async (uid) => {
    return uid;
  }
);

export const loginForm = createAsyncThunk(
  "login/loginForm",
  async (userData) => {
    return userData;
  }
);

export const fetchgetUploadFile = createAsyncThunk(
  "getUploadFile/fetchAllgetOrderDetailRequests",
  async () => {
    const resp = await getUploadFile();
    return resp.data;
  }
);

export const fetchgetPrintingData = createAsyncThunk(
  "getPrintingData/fetchallgetPrintingData",
  async (pageparams) => {
    const resp = await getprintingdata(pageparams);
    return resp.data;
  }
);

export const fetchgetelectricdata = createAsyncThunk(
  "getelectricdata/fetchgetelectricTestdata",
  async (params, search) => {
    const resp = await getelectricdata(params, search);
    return resp.data;
  }
);

export const fetchgetFviData = createAsyncThunk(
  "getfvidata/fetchgetFviDatarequest",
  async (params, search) => {
    const resp = await getfvidata(params, search);
    return resp.data;
  }
);

export const fetchqrPrintingData = createAsyncThunk(
  "getqrprintingdata/fetchqrprintingrequest",
  async (params, search) => {
    const resp = await getqrprintingdata(params, search);
    return resp.data;
  }
);
export const fetchVisualInspectionData = createAsyncThunk(
  "getVisualInspectionData/fetchvisualinspectionrequest",
  async (params) => {
    const resp = await getVisualInspectionData(params);
    return resp.data;
  }
);

export const fetchOrderDetailData = createAsyncThunk(
  "getOrderDetailData/fetchOrderDetailrequest",
  async (params) => {
    const resp = await filterOrderDetail(params);
    return resp.data;
  }
);
const batchSlice = createSlice({
  name: "batch",
  initialState: {
    batch: "",
    loading: false,
    serchData: [],
    r1r2status: {},
    pairedData: "",
    batchTest: [],
    getBatchTest: "",
    documentUid: "",
    login: [],
    getOrderDetail: [],
    getUploadFile: [],
    getPrintingData: [],
    getelectricdata: [],
    getfvidata: [],
    getqrprintingdata: [],
    getVisualInspectionData: [],
    getOrderDetailData1: "",
  },
  reducers: {
    // omit reducer cases
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBatch.fulfilled, (state, { payload }) => {
        state.batch = payload;
      })
      .addCase(fetchAllBatch.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllBatchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBatchData.fulfilled, (state, { payload }) => {
        state.batch = payload;
      })
      .addCase(fetchAllBatchData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchElectricBatchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchElectricBatchData.fulfilled, (state, { payload }) => {
        state.batch = payload;
      })
      .addCase(fetchElectricBatchData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchFinalVisualBatchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFinalVisualBatchData.fulfilled, (state, { payload }) => {
        state.batch = payload;
      })
      .addCase(fetchFinalVisualBatchData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getRobotStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRobotStatus.fulfilled, (state, { payload }) => {
        state.r1r2status = payload.payload;
      })
      .addCase(getRobotStatus.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchpairedBatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchpairedBatch.fulfilled, (state, { payload }) => {
        state.pairedData = payload;
      })
      .addCase(fetchpairedBatch.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBatchTestReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBatchTestReport.fulfilled, (state, { payload }) => {
        state.getBatchTest = payload;
      })
      .addCase(getBatchTestReport.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBatchTestAutoPullData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBatchTestAutoPullData.fulfilled, (state, { payload }) => {
        state.batchTest = payload.payload;
      })
      .addCase(getBatchTestAutoPullData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDocumentForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDocumentForm.fulfilled, (state, { payload }) => {
        state.documentUid = payload;
      })
      .addCase(getDocumentForm.rejected, (state) => {
        state.loading = false;
      })

      .addCase(loginForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginForm.fulfilled, (state, { payload }) => {
        state.login = payload;
      })
      .addCase(loginForm.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchgetUploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchgetUploadFile.fulfilled, (state, { payload }) => {
        state.getUploadFile = payload;
      })
      .addCase(fetchgetUploadFile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchgetPrintingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchgetPrintingData.fulfilled, (state, { payload }) => {
        state.getPrintingData = payload;
      })
      .addCase(fetchgetPrintingData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchgetelectricdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchgetelectricdata.fulfilled, (state, { payload }) => {
        state.getelectricdata = payload;
      })
      .addCase(fetchgetelectricdata.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchgetFviData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchgetFviData.fulfilled, (state, { payload }) => {
        state.getfvidata = payload;
      })
      .addCase(fetchgetFviData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchqrPrintingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchqrPrintingData.fulfilled, (state, { payload }) => {
        state.getqrprintingdata = payload;
      })
      .addCase(fetchqrPrintingData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchVisualInspectionData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVisualInspectionData.fulfilled, (state, { payload }) => {
        state.getVisualInspectionData = payload;
      })
      .addCase(fetchVisualInspectionData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrderDetailData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetailData.fulfilled, (state, { payload }) => {
        state.getOrderDetailData1 = payload;
      })
      .addCase(fetchOrderDetailData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default batchSlice.reducer;
