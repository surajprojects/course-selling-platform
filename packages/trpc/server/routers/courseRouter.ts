import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { adminCourseRouter } from "./adminCourseRouter";
import { z } from "zod";

export const courseRouter = router({
    getAllCourses: publicProcedure
        .query(async (opts) => {
            const allCourses = await opts.ctx.prisma.course.findMany({
                orderBy: {
                    id: "asc"
                }
            });

            if (allCourses.length > 0) {
                return { message: "Found all courses!!!", allCourses };
            }

            return { message: "Courses not found!!!" };
        }),
    getCourse: publicProcedure
        .input(z.object({
            courseId: z.number(),
        }))
        .query(async (opts) => {
            const course = await opts.ctx.prisma.course.findUnique({
                where: {
                    id: opts.input.courseId,
                },
            });

            if (course) {
                return { message: "Course found successfully!!!", course };
            }

            return { message: "Course not found!!!" };
        }),
    admin: adminCourseRouter,
});