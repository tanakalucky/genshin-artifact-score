export interface Character {
  characterId: number; // APIのtypoに合わせる
  iconUrl: string;
}

export interface CharactersResponse {
  data: Character[];
}
