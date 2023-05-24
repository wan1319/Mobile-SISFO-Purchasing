import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONFIG_BASE_API_URL } from "../config/ConfigBase";
import { ServiceBaseRequest } from "./ServiceBase";
import { reject } from "lodash";

export const ServicePembelianList = (page, terms) => {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                "x-access-token": await AsyncStorage.getItem("@token")
            },
            params: { page, terms }
        };
        ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/pembelian`, config)
        .then((response) => {
            const{results, ...pagination} = response.data;
            resolve({results, pagination});
        })
        .catch((error) => reject(error));
    });
};

export const ServicePembelianCreate = (payload) => {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                "x-access-token": await AsyncStorage.getItem("@token"),
            },
        };

        ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/pembelian`, payload, config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => reject(error));
    })
};

export const ServicePembelianShare = (faktur) => {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                "x-access-token": await AsyncStorage.getItem("@token"),
            },
            responseType: "blob",
        };

        ServiceBaseRequest.post(
            `${CONFIG_BASE_API_URL}/pembelian/${faktur}/faktur-excel`,
            null,
            config
        )
            .then((response) => {
                resolve(response);
            })
            .catch((error) => reject(error));
    });
};