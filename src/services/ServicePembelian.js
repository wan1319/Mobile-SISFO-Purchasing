import { CONFIG_BASE_API_URL } from "../config/ConfigBase";
import { ServiceBaseRequest } from "./ServiceBase";

export const ServicePembelianCreate = (payload) => {
    return new Promise(async(resolve, reject) => {
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

