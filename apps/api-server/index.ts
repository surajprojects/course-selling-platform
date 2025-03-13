import { appRouter } from '@course-selling-platform/trpc/server/routers/_app';
import prisma from '@course-selling-platform/db';
import { createHTTPServer } from '@course-selling-platform/trpc/server/adapters/standalone';
import cors from "cors";
import type { CreateHTTPContextOptions } from '@course-selling-platform/trpc/server/adapters/standalone';

const server = createHTTPServer({
    router: appRouter,
    middleware: cors(),
    createContext(opts: CreateHTTPContextOptions) {
        const token = opts.req.headers["authorization"];
        const userId = token ?? null;
        return {
            prisma,
            userId,
            req: opts.req,
            res: opts.res,
        };
    }
});

server.listen(3000);