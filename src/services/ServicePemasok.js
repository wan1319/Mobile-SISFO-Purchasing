import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONFIG_BASE_API_URL } from "../config/ConfigBase";
import { ServiceBaseRequest } from "./ServiceBase";

export function ServicePemasokList(page, terms) {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
      params: { page, terms },
    };
    ServiceBaseRequest.get(`${CONFIG_BASE_API_URL}/pemasok`, config)
      .then((response) => {
        const { results, ...pagination } = response.data;
        resolve({ results, pagination });
      })
      .catch((error) => reject(error));
  });
}

export const ServicePemasokCreate = (payload) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
    };

    ServiceBaseRequest.post(`${CONFIG_BASE_API_URL}/pemasok`, payload, config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const ServicePemasokEdit = (payload) => {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: {
        "x-access-token": await AsyncStorage.getItem("@token"),
      },
    };

    ServiceBaseRequest.put(
      `${CONFIG_BASE_API_URL}/pemasok/${payload.kodePemasok}`,
      payload,
      config
    )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};