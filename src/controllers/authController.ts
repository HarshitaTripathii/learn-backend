import type { Request, Response } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

function hello(req: Request, res: Response) {
  return res.json({
    success: true,
    message: "Auth Router Working",
  });
}

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
  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return res.json({
    success: true,
    message: "Sign Up successfull",
  });
}

export { hello, signUp };
