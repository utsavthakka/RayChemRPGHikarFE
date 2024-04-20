import { CubejsApi } from '@cubejs-client/core';
const url = process.env.REACT_APP_API_URL

let apiTokenPromise;
export const cubejsApi = new CubejsApi({
    accessToken: async () => {
        if (!apiTokenPromise) {
            apiTokenPromise = fetch(`${url}/cube/auth/cubejs-token`)
                .then((res) => res.json())
                .then((r) => r.token);
        }
        return await apiTokenPromise; // wait for token to resolve
    },
    apiUrl: `${url}/cube/cubejs-api/v1/`
});