import prisma from "../utils/prisma.js";

export const votePost = async (req, res) => {

  try {

    const {
      postId,
      type,
    } = req.body;

    const userId = req.userId;
    console.log("REAL USER ID:", userId);

    console.log("POST ID:", postId);
    console.log("TYPE:", type);
    console.log("USER ID:", userId);




    const existingVote = await prisma.vote.findFirst({
      where: {
        postId,
        userId,
      },
    });

    console.log("EXISTING VOTE:", existingVote);




    if (existingVote && existingVote.type === type) {

      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Vote removed",
      });
    }




    if (existingVote) {

      await prisma.vote.update({
        where: {
          id: existingVote.id,
        },

        data: {
          type,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Vote updated",
      });
    }




    await prisma.vote.create({
      data: {
        type,
        userId,
        postId,
      },
    });




    res.status(201).json({
      success: true,
      message: "Vote added",
    });

  } catch (error) {

    console.log("VOTE ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};