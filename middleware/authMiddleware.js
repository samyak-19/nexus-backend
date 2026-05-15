import { getAuth } from "@clerk/express";

export const protectRoute = async (
  req,
  res,
  next
) => {

  try {

    const { userId } = getAuth(req);
     console.log("AUTH USER:", userId);


    if (!userId) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.userId = userId;

    next();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};