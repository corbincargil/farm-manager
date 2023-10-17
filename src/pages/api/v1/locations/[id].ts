import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";
import Location from "../../../../../models/Location";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      if (id) {
        const location = await Location.findById(id);
        res.status(200).json({ location });
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method === "PUT") {
    const { id } = req.query;
    if (!id || id === "") throw new Error("Missing record ID");

    try {
      const resp = await Location.findByIdAndUpdate(id, req.body);
      res.status(201).json({ message: "success", resp });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error posting location", error: error });
    }
    return res.status(200).json({ message: "stupid" });
  }
}
