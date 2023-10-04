import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";
import clientPromise from "../../../../lib/clientPromise";
import User from "../../../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "missing email or password", success: false });
    }

    const hash = await bcrypt.hash(password, 10);

    const userBody = { email, hash };

    //todo: improve error handling
    try {
      const resp = await User.create(userBody);
      return res
        .status(201)
        .json({ message: "successfully registered user", success: true, resp: resp });
    } catch (error: any) {
      console.error("error registering user", error);
      return res
        .status(500)
        .json({ message: "error registering user", success: false, error: error });
    }
  }
}
