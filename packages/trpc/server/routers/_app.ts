import { router } from '../trpc';
import { courseRouter } from './course';

export const appRouter = router({
    course: courseRouter
});

export type AppRouter = typeof appRouter;