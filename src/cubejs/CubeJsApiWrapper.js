import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import WebSocketTransport from "@cubejs-client/ws-transport";
import React from "react";

let apiTokenPromise;
const url = process.env.REACT_APP_API_URL

 export const cubejsApi = cubejs(
    () => {
      if (!apiTokenPromise) {
        apiTokenPromise = fetch(`${url}/cube/auth/cubejs-token`)
          .then((res) => res.json())
          .then((r) => r.token);
      }
      return apiTokenPromise;
    },
    {
      apiUrl: `${url}/cube/cubejs-api/v1/`,
    }
  );
  // branch
  
function CubeJsApiWrapper(props) {
    return (
        <CubeProvider cubejsApi={cubejsApi}>
          {props.children}
        </CubeProvider>
       )
}

export default CubeJsApiWrapper;

