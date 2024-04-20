import { request } from '../../api/api';

export const Station_api = (params) =>{

      const formData = new FormData();
  
    formData.append('station', params.file);

  

    return request.post(params.station,formData);
}


export const uploadBatchExcel = (params1) =>{

  const formData = new FormData();

formData.append('station', params1.file);



return request.post(params1.addbatch,formData);
}


export const getdemofile = (params) =>{

  return request.get(params.endpoint)
}


export const bagLabelDataReport = (params) =>{

  return request.post(`/bagLabelDataReport/`,params)
}

export const boxLabelDataReport = (params) =>{

  return request.post(`/boxLabelDataReport/`,params)
}