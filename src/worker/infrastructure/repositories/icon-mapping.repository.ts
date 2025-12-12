import {
  IconMapping,
  IIconMappingRepository,
} from "@/worker/domain/repositories/icon-mapping.repository.interface";
import { HttpClient } from "../http/httpClient";
import { AxiosHttpClient } from "../http/axiosHttpClient";

export class IconMappingRepository implements IIconMappingRepository {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new AxiosHttpClient();
  }

  async getIconMapping(): Promise<Record<string, IconMapping>> {
    const response = await this.httpClient.get<Record<string, IconMapping>>(
      "https://raw.githubusercontent.com/tanakalucky/genshin-icon-mapping/main/output/mapping.json",
    );

    return response;
  }
}
