import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";
import Company from "../../../../../models/Company";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  if (req.method === "GET") {
    const companies = await Company.find();
    res.status(200).json({ companies });
  }

  if (req.method === "POST") {
    // const { name, company, type, address } = req.body;
    // await Company.create({ name, company, type, address });
    // res.status(201).json({ message: "success", location: req.body });
  }
}
