import axios from "axios";
import { Alert } from "react-native";

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
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
        ) {
            let messages = error.response.data.errors
                .map((item) => {
                    return `${item.path}: ${item.msg}`;
                })
                .join(`\n`);

            Alert.alert("Ups!", messages);
        }
        return Promise.reject(error);
    }
);