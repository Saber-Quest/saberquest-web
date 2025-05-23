import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { decrypt } from "@lib/api/createSession";
import rateLimit from "@lib/api/ratelimit";

const ratelimit: any = 10;
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
      if (req.method === "PUT") {
        const {
          ac,
          t,
        }: {
          ac: boolean;
          t: string;
        } = req.body;

        if (!t) {
          return res.status(400).json({ error: "Missing valid token" });
        }
        if (!ac && ac !== false) {
          return res
            .status(400)
            .json({ error: "Missing valid autocomplete option" });
        }
        const deToken = decrypt(t);

        await axios
          .put(
            `${process.env.API_URL}/users/update`,
            {
              property: "doesMapChallenge",
              value: ac,
            },
            {
              headers: {
                Authorization: `Bearer ${deToken}`,
              },
            },
          )
          .then(() => {
            return res
              .status(200)
              .json({ message: "mapchallenge-setting updated!" });
          })
          .catch((error) => {
            return res.status(400).json({ error: error.response.data.error });
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
