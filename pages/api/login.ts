// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      success: boolean;
      message: string;
    }
  | {
      success: boolean;
      user: {
        email: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(400).json({ success: false, message: "Invalid Method" });

  if (req.body.email === "unregistredUser@email.com")
    return res.status(404).json({
      success: false,
      message: `No user with the email ${req.body.email} could be found.`,
    });

  return res.status(200).json({ success: true, user: req.body });
}
