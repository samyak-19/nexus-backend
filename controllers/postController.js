import prisma from "../utils/prisma.js";
import cloudinary from "../utils/cloudinary.js";



// CREATE POST
export const createPost = async (req, res) => {

  try {

    const {
      title,
      content,
      communitySlug,
    } = req.body;




    if (!title || !content || !communitySlug) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }




    const community = await prisma.community.findUnique({
      where: {
        slug: communitySlug,
      },
    });




    if (!community) {

      return res.status(404).json({
        success: false,
        message: "Community not found",
      });
    }




    let imageUrl = "";




    // IMAGE UPLOAD
    if (req.file) {

      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;




      const uploadResponse = await cloudinary.uploader.upload(
        base64Image,
        {
          folder: "nezus-posts",
        }
      );




      imageUrl = uploadResponse.secure_url;
    }




   




    const post = await prisma.post.create({

      data: {
        title,
        content,
        imageUrl,

        communityId: community.id,

        authorId: req.userId,
      },
    });




    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// GET POSTS OF COMMUNITY
export const getCommunityPosts = async (req, res) => {

  try {

    const { slug } = req.params;

    const { sort } = req.query;

    const community = await prisma.community.findUnique({
      where: {
        slug,
      },
    });

    if (!community) {

      return res.status(404).json({
        success: false,
        message: "Community not found",
      });
    }




    let posts = await prisma.post.findMany({

      where: {
        communityId: community.id,
      },

      include: {
        votes: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });




    // SORT POPULAR
    if (sort === "popular") {

      posts = posts.sort((a, b) => {

        const aVotes = a.votes.reduce(
          (acc, vote) => acc + vote.type,
          0
        );

        const bVotes = b.votes.reduce(
          (acc, vote) => acc + vote.type,
          0
        );

        return bVotes - aVotes;
      });
    }




    res.status(200).json({
      success: true,
      posts,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




// GET SINGLE POST
export const getSinglePost = async (req, res) => {

  try {

    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {

      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getGlobalFeed = async (req, res) => {

  try {

    const { sort } = req.query;

    let posts = await prisma.post.findMany({

      include: {

        votes: true,

        community: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    // TRENDING SORT
    if (sort === "trending") {

      posts = posts.sort((a, b) => {

        const aVotes = a.votes.reduce(
          (acc, vote) => acc + vote.type,
          0
        );

        const bVotes = b.votes.reduce(
          (acc, vote) => acc + vote.type,
          0
        );

        return bVotes - aVotes;
      });
    }

    res.status(200).json({
      success: true,
      posts,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};