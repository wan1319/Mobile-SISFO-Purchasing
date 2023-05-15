import { CONFIG_BASE_API_URL } from "../config/ConfigBase";
import { ServiceBaseRequest } from "./ServiceBase";

export const ServicePemasokCreate = (payload) => {
    return new Promise(async (resolve, reject) => {
        const config = {
            headers: {
                "x-access-token": await ServiceBaseGetToken(),
            },
        };

        ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/pemasok`, payload, config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => reject(error));
    });
};