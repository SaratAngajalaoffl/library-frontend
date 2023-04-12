import { ACCESS_TOKEN } from "../config/keys";

export const getAccessTokenFromStorage = () =>
    localStorage.getItem(ACCESS_TOKEN);

export const saveAccessTokenToStorage = (data) =>
    localStorage.setItem(ACCESS_TOKEN, data);

export const deleteAccessTokenFromStorage = () =>
    localStorage.removeItem(ACCESS_TOKEN);

export const clearStorage = () => {
    localStorage.clear();
};

export const logoutUser = () => {
    clearStorage();
    window.location.reload();
};
