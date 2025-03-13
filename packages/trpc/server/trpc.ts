import { initTRPC } from "@trpc/server";
import { createTRPCContext } from "./context/context"

const t = initTRPC.context<typeof createTRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;