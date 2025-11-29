import axios, { type AxiosInstance } from 'axios';

import type {
  GetStarshipsParams,
  GetStarshipsResponse,
  ApiRequestConfig,
  BaseStarship,
  GetStarshipResponse,
} from './types';

export * from './types';

export class StarshipsApi {
  private axios: AxiosInstance = axios.create({
    baseURL: 'https://swapi.dev/api/starships',
  });

  async getStarships(
    params?: GetStarshipsParams,
    config?: ApiRequestConfig,
  ): Promise<GetStarshipsResponse> {
    const response = await this.axios.get<
      Omit<GetStarshipsResponse, 'results'> & { results: BaseStarship[] }
    >('/', {
      ...config,
      params,
    });

    const { results: rawStarships, ...paginationProps } = response.data;

    return {
      ...paginationProps,
      results: rawStarships.map((rawStarship) => ({
        ...rawStarship,
        id: Number(rawStarship.url.split('/').filter(Boolean).pop()!),
      })),
    };
  }

  async getStarship(
    id: number,
    config?: ApiRequestConfig,
  ): Promise<GetStarshipResponse> {
    const response = await this.axios.get<BaseStarship>(`/${id}`, config);

    return {
      id,
      ...response.data,
    };
  }
}

export const starshipsApi = new StarshipsApi();

export default starshipsApi;
