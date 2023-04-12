import { getRequest, postRequest } from "../utils/request.utils";
import { BOOKS_RESOURCE_URL } from "../utils/url.utils";

export const getBooks = () => {
    return getRequest({
        url: `${BOOKS_RESOURCE_URL}`,
        noAuth: true,
    });
};

export const addBook = (data) => {
    return postRequest({
        url: `${BOOKS_RESOURCE_URL}`,
        noAuth: true,
        data,
    });
};

export const getBookById = (id) => {
    return getRequest({
        url: `${BOOKS_RESOURCE_URL}/${id}`,
        noAuth: true,
    });
};

export const uploadFile = (data) => {
    return postRequest({
        url: `${BOOKS_RESOURCE_URL}/upload`,
        noAuth: true,
        headers: {
            "Content-type": `multipart/form-data; boundary=${data._boundary}`,
        },
        data,
    });
};
