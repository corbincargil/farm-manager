import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";
import Location from "../../../../../models/Location";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const { id } = req.query;
    if (id) {
      const location = await Location.findById(id);
      res.status(200).json({ location });
    }
  } catch (error) {
    console.log(error);
  }
}
