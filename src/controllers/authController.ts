import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function hello(req: Request, res: Response) {
  return res.json({
    success: true,
    message: "Auth Router Working",
  });
}

const JWT_SECRET = process.env.JWT_SECRET || "";
async function signUp(req: Request, res: Response) {
  // null check for  NAME, EMAIL, PASSWORD, CONFIRM PASSWORD
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.json({
      success: false,
      message: "Enter Details",
    });
  }
  // check if password === confirm password
  if (password !== confirmPassword) {
    return res.json({
      success: false,
      message: "password do not match",
    });
  }
  // check if user exists in db, if Yes then tell them to login & return
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return res.json({
      success: false,
      message: "User already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  // add user to the db
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // The .create() method returns the user object it just created (including the id).
  // You can use that directly.
  // keep the new user log in
  // get the user id, to make the token

  // now make a token to be sent to client browser in cookie
  const token = jwt.sign(
    {
      userId: newUser.id,
      role: newUser.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  // set this token on cookie
  res.cookie("myJwtCookie", token, {
    secure: false,
    httpOnly: true,
    maxAge: 3600,
  });

  return res.json({
    success: true,
    message: "Sign Up successfull",
  });
}

// const JWT_SECRET = process.env.JWT_SECRET || "";

async function logIn(req: Request, res: Response) {
  // check if user exists in DB by email
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.json({
      success: false,
      message: "user does not exists",
    });
  }
  // encrypt the password entered by user, and check if it matches woth password stored on DB
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.json({
      success: false,
      message: "password does not matched",
    });
  }
  // using user id, make a JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
  // set this token on cookie, on client side
  res.cookie("myJwtCookie", token, {
    secure: false,
    httpOnly: true,
    maxAge: 3600,
  });
  return res.json({
    success: true,
    message: "Logged In sucessfully",
  });
}

export { hello, signUp, logIn };
