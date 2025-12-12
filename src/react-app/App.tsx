import { useState } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useCharacters } from "./hooks/useCharacters";

function App() {
  const [userId, setUserId] = useState<string>("");
  const [searchUserId, setSearchUserId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string>("");

  const { data, isLoading, error, refetch } = useCharacters(searchUserId);

  const validateUserId = (value: string): boolean => {
    const trimmed = value.trim();
    return /^\d+$/.test(trimmed);
  };

  const handleSearch = () => {
    setValidationError("");
    const trimmed = userId.trim();

    if (!trimmed) {
      setValidationError("UIDを入力してください");
      return;
    }

    if (!validateUserId(trimmed)) {
      setValidationError("UIDは数値である必要があります");
      return;
    }

    setSearchUserId(trimmed);
  };

  // 初期状態: 検索フォーム
  if (!searchUserId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">キャラクター検索</h1>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="UIDを入力してください"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {validationError && <p className="text-red-500 text-sm">{validationError}</p>}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            検索
          </button>
        </div>
      </div>
    );
  }

  // 検索実行後: 結果表示
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* ヘッダー */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">UID: {searchUserId}</h1>
        <div className="space-x-2">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "読込中..." : "リフレッシュ"}
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            別のUIDで検索
          </button>
        </div>
      </div>

      {/* ローディング状態 */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* エラー状態 */}
      {error && !isLoading && (
        <div className="max-w-2xl mx-auto text-center p-8 bg-white rounded-lg shadow">
          <p className="text-red-500 text-xl mb-4">エラーが発生しました: {error.message}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            再試行
          </button>
        </div>
      )}

      {/* データなし状態 */}
      {data && data.data.length === 0 && !isLoading && !error && (
        <div className="max-w-1xl mx-auto text-center p-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-2xl">データがありません</p>
        </div>
      )}

      {/* キャラクター一覧 */}
      {data && data.data.length > 0 && !isLoading && !error && (
        <div className="w-full max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <div className="flex gap-4 p-4 min-w-min">
              {data.data.map((character) => (
                <div key={character.characterId} className="shrink-0 group">
                  <img
                    src={character.iconUrl}
                    alt={`Character ${character.characterId}`}
                    loading="lazy"
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
