import prisma from "../utils/prisma.js";

// CREATE COMMENT
export const createComment = async (req, res) => {
  

  try {

    const {
      content,
      postId,
    } = req.body;

    const userId = req.userId;

    if (!content || !postId) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
      },
    });




    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




// GET COMMENTS OF POST
export const getPostComments = async (req, res) => {

  try {

    const { postId } = req.params;

    const comments = await prisma.comment.findMany({

      where: {
        postId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });




    res.status(200).json({
      success: true,
      comments,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};