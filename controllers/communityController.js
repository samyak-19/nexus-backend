import prisma from "../utils/prisma.js";


// CREATE COMMUNITY
export const createCommunity = async (req, res) => {

  try {

    const {
      name,
      description,
    } = req.body;





    if (!name || !description) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }





    const existingCommunity = await prisma.community.findUnique({

      where: {
        slug: name.toLowerCase(),
      },
    });





    if (existingCommunity) {

      return res.status(400).json({
        success: false,
        message: "Community already exists",
      });
    }





    const community = await prisma.community.create({

      data: {
        name,
        slug: name.toLowerCase(),
        description,
      },
    });





    res.status(201).json({
      success: true,
      message: "Community created successfully",
      community,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// GET ALL COMMUNITIES
export const getCommunities = async (req, res) => {

  try {

    const communities = await prisma.community.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      communities,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




// GET SINGLE COMMUNITY
export const getSingleCommunity = async (req, res) => {

  try {

    const { slug } = req.params;

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

    res.status(200).json({
      success: true,
      community,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};