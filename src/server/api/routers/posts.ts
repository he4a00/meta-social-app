import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "y/server/api/trpc";


export const postsRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      
      select: {
        id: true,
        content: true,
        authorId: true,
        author: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
      },
      
    });
   
    return posts;
  }),

  createPost: protectedProcedure.input(z.object({
    content: z.string()
  })).mutation(async({ctx, input}) => {
    const authorId = ctx.session.user.id;
    const post = await ctx.prisma.post.create({
      data: {
        content: input.content,
        authorId
      }
    })
    return post
  })
  
});
