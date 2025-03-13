import { adminProcedure, router } from "../trpc";
import { z } from "zod";

export const adminCourseRouter = router({
    createCourse: adminProcedure
        .input(z.object({
            title: z.string(),
            description: z.string(),
            price: z.number(),
            isPublished: z.boolean().optional(),
        }))
        .mutation(async (opts) => {
            const newCourseData: { title: string, description: string, price: number, isPublished?: boolean, authorId: number } = {
                title: opts.input.title,
                description: opts.input.description,
                price: opts.input.price,
                authorId: opts.ctx.user.id,
            };

            if (opts.input.isPublished) newCourseData.isPublished = opts.input.isPublished;

            const newCourse = await opts.ctx.prisma.course.create({
                data: newCourseData,
            });

            return { message: "Course created successfully!!!", newCourse };
        }),
    editCourse: adminProcedure
        .input(z.object({
            courseId: z.number(),
            title: z.string().optional(),
            description: z.string().optional(),
            price: z.number().optional(),
            isPublished: z.boolean().optional(),
        }))
        .mutation(async (opts) => {
            const updatedData: { title?: string, description?: string, price?: number, isPublished?: boolean } = {};
            if (opts.input.title) updatedData.title = opts.input.title;
            if (opts.input.description) updatedData.description = opts.input.description;
            if (opts.input.price) updatedData.price = opts.input.price;
            if (opts.input.isPublished) updatedData.isPublished = opts.input.isPublished;

            const updatedCourse = await opts.ctx.prisma.course.update({
                where: {
                    id: opts.input.courseId,
                    authorId: opts.ctx.user.id,
                },
                data: updatedData,
            });

            return { message: "Course updated successfully!!!", updatedCourse };
        }),
    deleteCourse: adminProcedure
        .input(z.object({
            courseId: z.number(),
        }))
        .mutation(async (opts) => {
            const deletedCourse = await opts.ctx.prisma.course.delete({
                where: {
                    id: opts.input.courseId,
                    authorId: opts.ctx.user.id,
                }
            });
            return { message: "Course deleted successfully!!!", deletedCourse };
        }),
});