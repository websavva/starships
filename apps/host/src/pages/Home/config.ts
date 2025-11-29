export interface HomePageParams {
  page: number;
  search: string;
}

export const getDefaultHomePageParams = (): HomePageParams => ({
  page: 1,
  search: '',
});
