import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const helloRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }).nullish())
    .query(({ input }) => {
      return {
        name: `Hello ${input?.name ?? "World"}`,
        age: Math.floor(Math.random() * 100),
      };
    }),
});

export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
