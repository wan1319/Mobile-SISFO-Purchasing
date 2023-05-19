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

export const ServiceBaseHumanDate = (date) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    if (typeof date === "string") {
        return new Date(Date.parse(date)).toLocaleString("id-ID", options);
    }
    if (date) {
        return date.toLocaleString("id-ID", options);
    }

    return "";
};

export const ServiceBaseRandomID = (prefix = "ID") => {
    const date = new Date();
    return `${prefix.toUpperCase()}-${date.getTime()}`;
};

export const ServiceBaseIsDuplicateArray = (items, val, by) => {
    let flatItems = items.map((value) => value[by]);
    return flatItems.includes(val);
};