import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { decrypt } from "@lib/api/createSession";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: any = 2;
const limiter = rateLimit({
  interval: 10 * 1000,
  uniqueTokenPerInterval: 200,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await limiter.check(res, ratelimit, "CACHE_TOKEN");
    try {
      if (req.method === "POST") {
        const {
          t,
          id,
        }: {
          t: string;
          id: string;
        } = req.body;

        if (!t) {
          return res.status(400).json({ error: "Missing valid token" });
        }
        const deToken = decrypt(t);

        await axios
          .post(
            `${process.env.API_URL}/users/${id}/complete`,
            {},
            {
              headers: {
                Authorization: `Bearer ${deToken}`,
              },
            },
          )
          .then(() => {
            return res
              .status(200)
              .json({ message: "Challenge completed. Well played!" });
          })
          .catch((error) => {
            return res.status(400).json({ error: error.response.data.message });
          });
      } else {
        return res.status(400).json({ error: "Invalid request method" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something bad happened" });
    }
  } catch (error) {
    return res.status(429).json({ error: "Rate limit exceeded.\n Slow down!" });
  }
}
