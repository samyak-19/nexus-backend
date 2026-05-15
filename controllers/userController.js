import prisma from "../utils/prisma.js";

export const getUserProfile = async (req, res) => {

  try {

    const { id } = req.params;

    const posts = await prisma.post.findMany({

      where: {
        authorId: id,
      },

      include: {
        votes: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const comments = await prisma.comment.findMany({

      where: {
        authorId: id,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,

      user: {
        id,
        posts,
        comments,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};