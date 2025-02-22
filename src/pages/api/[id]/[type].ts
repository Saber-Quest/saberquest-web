import axios from "axios";
import sharp from "sharp";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getPlayerBanner(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query as unknown as { id: string };
    const { type } = req.query as unknown as { type: string };

    if (req.method !== "GET") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    if (type !== "ver" && type !== "hor") {
      res.status(400).json({ message: "Invalid type" });
      return;
    }

    let response;

    response = await axios.get(
      `${process.env.API_URL}/assets/${id}/banner?type=${type}`,
      { responseType: "arraybuffer" },
    );

    const darkenedImageBuffer = await sharp(response.data)
      .modulate({ brightness: 0.2, saturation: 0.2 })
      .blur(2)
      .toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Length", darkenedImageBuffer.length);
    res.status(200).end(darkenedImageBuffer);
  } catch (error) {
    return res.status(500).json({ error: { message: "An error occurred" } });
  }
}
