import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";
import Equipment from "../../../../../models/Equipment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  if (req.method === "GET") {
    const equipment = await Equipment.find();
    res.status(200).json({ equipment });
  }

  if (req.method === "POST") {
    // const { name, company, type, address } = req.body;
    // await Company.create({ name, company, type, address });
    // res.status(201).json({ message: "success", location: req.body });
  }
}
