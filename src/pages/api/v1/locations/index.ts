import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";
import Location from "../../../../../models/Location";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("🚀 ~ file: index.ts:9 ~ req:", req.method);
  await connectToDatabase();
  if (req.method === "GET") {
    const locations = await Location.find();
    console.log("🚀 ~ file: index.ts:8 ~ GET ~ locations:", locations);
    res.status(200).json({ locations });
  }

  if (req.method === "POST") {
    const { name, company, type, address } = req.body;
    await Location.create({ name, company, type, address });

    res.status(201).json({ message: "success", location: req.body });
  }
}
