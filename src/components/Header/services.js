import { request } from "../../api/api";


export const LogOutApi = () => {
    return request.post(`/user/logOut/`);
};