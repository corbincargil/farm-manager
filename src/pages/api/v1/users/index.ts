import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) res.status(400).json({ message: "missing email" });

    const user = await User.findOne({ email });
    res.status(200).json({ user });
  }

  //   if (req.method === "POST") {
  //     try {
  //       const resp = await Company.create(req.body);
  //       res.status(201).json({ message: "success", resp });
  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).json({ message: "error posting company", error: error });
  //     }
  //   }
}
