export interface IconMapping {
  avatarId: number;
  iconUrl: string;
}
export interface IIconMappingRepository {
  getIconMapping(): Promise<Record<number, IconMapping>>;
}
