import { Request, Response } from "express";
import { db } from "../db/db";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.password) {
    res.status(400).send("Bad request");
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(typeof(hashedPassword));
    const user = {
      name: req.body.name,
      password: hashedPassword,
      role: req.body.role
    };
    db.one(
      'INSERT INTO "Users" (username,password,role) VALUES ($1,$2,$3)',
      [user.name, user.password, user.role]
    );
  } catch (error) {
    console.log(error);
    res.status(502).send("Internal server error");
  }
};



export default {createUser}