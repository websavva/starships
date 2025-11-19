import axios, { type AxiosInstance, type AxiosAdapter } from "axios";
// import { cacheAdapterEnhancer } from "axios-extensions";

import type {
  Starship,
  GetStarshipsParams,
  GetStarshipsResponse,
} from "./types";

export * from "./types";

export class StarshipsApi {
  private axios: AxiosInstance = axios.create({
    baseURL: "https://swapi.dev/api/starships",
    // adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter),
  });

  async getStarships(params: GetStarshipsParams = {}) {
    const response = await this.axios.get<GetStarshipsResponse>("/", {
      params,
    });

    return response.data;
  }

  async getStarship(id: string) {
    const response = await this.axios.get<Starship>(`/${id}`);

    return response.data;
  }
}

export const starshipsApi = new StarshipsApi();
