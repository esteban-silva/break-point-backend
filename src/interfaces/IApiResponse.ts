export default interface IApiResponse {
  status: number;
  message: string;
  data: unknown | null;
}
