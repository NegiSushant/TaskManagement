import { Router, Response, Request } from "express";
import bcrypt from "bcrypt";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { signUpSchema, SignInSchema } from "@repo/common/types";
import { middleware } from "./middleware";
const authRoute: Router = Router();

// access tokens
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_key";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "refresh_secret_key";

// signUp/register route
authRoute.post("/register", async (req: Request, res: Response) => {
  try {
    const registerData = signUpSchema.safeParse(req.body);

    if (!registerData.success) {
      return res.status(400).json({
        message: "Incorrect Input",
      });
    }
    console.log(registerData);

    const password = registerData.data.password;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        username: registerData.data.username,
        email: registerData.data.email,
        password: hashPassword,
      },
    });

    return res.status(200).json({
      message: "user created successfully!",
      userId: user.id,
    });
  } catch (e) {
    console.log(e);

    return res.status(400).json({
      message: e as string,
      userId: null,
    });
  }
});

// Sign/login route
authRoute.post("/login", async (req: Request, res: Response) => {
  try {
    const singInData = SignInSchema.safeParse(req.body);

    if (!singInData.data) {
      return res.status(404).json({
        message: "Incorrect input",
      });
    }

    const user = await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            username: singInData.data.username,
          },
          {
            email: singInData.data.username,
          },
        ],
      },
    });

    if (!user) {
      return res.status(403).json({
        message: "User does not exist!",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      singInData.data.password,
      user.password,
    );

    if (!isPasswordMatch) {
      return res.status(403).json({
        message: "Wrong credentials!",
      });
    }

    // generate short lived access token for 15 min
    const accessToken = jwt.sign({ userId: user.id }, JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    // Long lived refrece token for 7 days
    const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
});

// token refress
authRoute.post("/refresh", middleware, (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    // Verify the refresh token using the REFRESH secret
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      userId: string;
    };

    // If valid, issue a brand new Access Token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (e) {
    // If the refresh token is expired or invalid, the user must log in again
    return res.status(403).json({
      message: "Invalid or expired refresh token. Please log in again.",
    });
  }
});


export default authRoute;
