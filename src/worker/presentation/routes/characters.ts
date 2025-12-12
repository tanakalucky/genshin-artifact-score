import { Hono } from "hono";
import type { Env } from "@/worker/env";
import { GetCharacterList } from "@/worker/application/usecase/get-character-list";

const app = new Hono<{ Bindings: Env }>();

app.get("/:userId", async (c) => {
  const userId = c.req.param("userId");

  const usecase = new GetCharacterList();
  const characters = await usecase.execute(userId);

  return c.json({ data: characters });
});

export default app;
