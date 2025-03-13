import { router } from '../trpc';
import { courseRouter } from './courseRouter';

export const appRouter = router({
    course: courseRouter
});

export type AppRouter = typeof appRouter;