import { useQuery } from "@tanstack/react-query";
import type { CharactersResponse } from "@/react-app/types/character";

export function useCharacters(userId: string | null) {
  return useQuery<CharactersResponse>({
    queryKey: ["characters", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");

      const response = await fetch(`/api/characters/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!userId, // userIdがある場合のみ実行
    retry: 3, // main.tsxで既に設定済みだが明示的に指定
    staleTime: 5 * 60 * 1000, // 5分間はキャッシュを使用
  });
}
