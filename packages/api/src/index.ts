import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
// import { cacheAdapterEnhancer } from "axios-extensions";

import type {
  Starship,
  GetStarshipsParams,
  GetStarshipsResponse,
  ApiRequestConfig,
} from "./types";

export * from "./types";

export class StarshipsApi {
  private axios: AxiosInstance = axios.create({
    baseURL: "https://swapi.dev/api/starships",
    // adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter),
  });

  async getStarships(
    params: GetStarshipsParams = {},
    config: ApiRequestConfig = {}
  ) {
    const response = await this.axios.get<GetStarshipsResponse>("/", {
      ...config,
      params,
    });

    return response.data;
  }

  async getStarship(id: string, config: ApiRequestConfig = {}) {
    const response = await this.axios.get<Starship>(`/${id}`, config);

    return response.data;
  }
}

export const starshipsApi = new StarshipsApi();
