import axios from "axios";
import { HttpClient, RequestConfig } from "./httpClient";

export class AxiosHttpClient implements HttpClient {
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await axios.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data: unknown, config?: RequestConfig): Promise<T> {
    const response = await axios.post<T>(url, data, config);
    return response.data;
  }
}
