import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "y/server/api/trpc";



export const usersRouter = createTRPCRouter({
  getUserByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
        const userProfile = await ctx.prisma.user.findFirst({
          where: {
            name: input.name,
          },
          select: {
            posts: true,
            id: true,
            name: true,
            image: true,
            email: true,

            
          }
        });
        return userProfile;
    }),

    getAllUsers: publicProcedure.query(async ({ctx}) => {
      const users = await ctx.prisma.user.findMany()
      return users
    })
});

