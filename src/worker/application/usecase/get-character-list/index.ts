import { IIconMappingRepository } from "@/worker/domain/repositories/icon-mapping.repository.interface";
import { CharactersRepository } from "@/worker/infrastructure/repositories/characters.repository";
import { IconMappingRepository } from "@/worker/infrastructure/repositories/icon-mapping.repository";

export class GetCharacterList {
  private readonly charactersRepository: CharactersRepository;
  private readonly iconMappingRepository: IIconMappingRepository;

  constructor() {
    this.charactersRepository = new CharactersRepository();
    this.iconMappingRepository = new IconMappingRepository();
  }

  async execute(userId: string): Promise<{ characterId: number; iconUrl: string }[]> {
    const characterIds = await this.charactersRepository.getCharacterIdsByUserId(userId);

    const characterIcons = await this.iconMappingRepository.getIconMapping();

    return characterIds.map((id) => ({
      characterId: id,
      iconUrl: characterIcons[id].iconUrl,
    }));
  }
}
