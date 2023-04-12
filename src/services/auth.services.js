import { getRequest, postRequest } from "../utils/request.utils";
import { GET_AUTH_URL, LOGIN_URL, REGISTER_URL } from "../utils/url.utils.js";

export const getAuth = () => {
    return getRequest({
        url: GET_AUTH_URL,
        noAuth: true,
    });
};

export const login = (data) => {
    return postRequest({
        url: LOGIN_URL,
        data,
    });
};

export const register = (data) => {
    return postRequest({
        url: REGISTER_URL,
        data,
    });
};
