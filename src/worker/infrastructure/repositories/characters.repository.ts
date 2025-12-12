import { ICharactersRepository } from "@/worker/domain/repositories/characterts.repository.interface";
import { USER_AGENT } from "@/worker/infrastructure/const";
import { AxiosHttpClient } from "@/worker/infrastructure/http/axiosHttpClient";
import { HttpClient } from "@/worker/infrastructure/http/httpClient";

interface Response {
  playerInfo: {
    showAvatarInfoList: Character[];
  };
}

interface Character {
  avatarId: number;
}

export class CharactersRepository implements ICharactersRepository {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new AxiosHttpClient();
  }

  async getCharacterIdsByUserId(userId: string): Promise<number[]> {
    const response = await this.httpClient.get<Response>(
      `https://enka.network/api/uid/${userId}?info`,
      {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/json",
        },
      },
    );

    return response?.playerInfo?.showAvatarInfoList?.map((character) => character.avatarId) || [];
  }
}
