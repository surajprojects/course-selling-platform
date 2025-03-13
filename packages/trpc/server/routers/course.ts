import { isLoggedIn } from "../middlewares/user";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const courseRouter = router({
    getCourse: publicProcedure
        .input(z.object({
            id: z.string().optional(),
        }))
        .use(isLoggedIn)
        .query(async (opts) => {
            const userid = opts.ctx.userId;
            if (!userid) {
                return { message: "Not logged in!!!" };
            }
            const courses = await opts.ctx.prisma.course.findMany({
                where: {
                    authorId: Number(userid),
                },
                orderBy: {
                    id: "asc"
                }
            });

            if (courses) {
                return { message: "Found all courses!!!", courses };
            }

            return { message: "Courses not found!!!" };

        }),
    createCourse: publicProcedure
        .input(z.object({
            title: z.string(),
            price: z.number(),
        }))
        .mutation(async (opts) => {
            const newCourse = await opts.ctx.prisma.course.create({
                data: {
                    title: opts.input.title,
                    price: opts.input.price,
                    authorId: Number(opts.ctx.userId),
                }
            });
            return { message: "Course created successfully!!!", newCourse };
        }),
    editCourse: publicProcedure
        .input(z.object({
            id: z.string(),
            title: z.string(),
            published: z.boolean().optional(),
        }))
        .mutation(async (opts) => {
            // needs to optimize to make single db call
            let updateCourse = await opts.ctx.prisma.course.findUnique({
                where: {
                    id: Number(opts.input.id),
                    authorId: Number(opts.ctx.userId),
                }
            });

            if (!updateCourse) {
                return { message: "Course not found!" };
            }

            updateCourse = await opts.ctx.prisma.course.update({
                where: {
                    id: Number(opts.input.id),
                    authorId: Number(opts.ctx.userId),
                },
                data: {
                    title: opts.input.title,
                    published: opts.input.published,
                },
            });

            return { message: "Course updated successfully!", updateCourse };
        }),
    deleteTodo: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .mutation(async (opts) => {
            // needs to optimize to make single db call
            let courseData = await opts.ctx.prisma.course.findUnique({
                where: {
                    id: Number(opts.input.id),
                    authorId: Number(opts.ctx.userId),
                }
            });

            if (courseData) {
                courseData = await opts.ctx.prisma.course.delete({
                    where: {
                        id: Number(opts.input.id),
                        authorId: Number(opts.ctx.userId),
                    }
                });
                return { message: "Course deleted successfully!!!", courseData };
            }
            else {
                return { message: "Course not found!" };
            }
        }),

});