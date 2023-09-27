import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";
import Company from "../../../../../models/Company";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  if (req.method === "GET") {
    const companies = await Company.find();
    res.status(200).json({ companies });
  }

  if (req.method === "POST") {
    try {
      const resp = await Company.create(req.body);
      res.status(201).json({ message: "success", resp });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error posting company", error: error });
    }
  }
}
