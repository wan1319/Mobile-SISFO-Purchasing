import axios from "axios";

export const ServiceBaseRequest = axios.create({
    timeout: 1000,
});

ServiceBaseRequest.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

ServiceBaseRequest.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        if (error?.response?.data?.errors) {
            let messages = error.response.data.errors;
            console.log(messages);
        }
        return Promise.reject(error);
    }
);