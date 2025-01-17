import { useAuthStore } from '../stores/auth.store.js';
import {useAlertStore} from "../stores/alert.store.js";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        if(!url.includes("http")) {
            url = import.meta.env.VITE_API_URL + url
        }
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        requestOptions.headers['Accept'] = 'application/json';
        if (method === 'GET' && body) {
            const queryParams = new URLSearchParams(body);
            url += `?${queryParams}`;
        } else if (body) {
            if (body instanceof FormData) {
                requestOptions.body = body;
            } else {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { userData } = useAuthStore();
    const isLoggedIn = !!userData?.access_token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${userData.access_token}` };
    } else {
        return {};
    }
}

async function handleResponse(response) {
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok || response.errors) {
        const { userData, logout } = useAuthStore();
        if ([401, 403].includes(response.status) && userData) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            logout();
        }

        // get error message from body or default to response status
        const error = (data && data.errors) || response.status;
        const alertStore = useAlertStore();
        alertStore.error(error);
    }

    return data;
}