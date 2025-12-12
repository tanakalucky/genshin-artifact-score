export interface ICharactersRepository {
  getCharacterIdsByUserId(userId: string): Promise<number[]>;
}
