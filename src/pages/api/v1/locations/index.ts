import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";
import Location from "../../../../../models/Location";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  if (req.method === "GET") {
    try {
      const locations = await Location.find();
      res.status(200).json({ locations });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "error fetching locations", error: error });
    }
  }

  if (req.method === "POST") {
    try {
      const resp = await Location.create(req.body);
      res.status(201).json({ message: "success", resp });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error posting location", error: error });
    }
  }
}
