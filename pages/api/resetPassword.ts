import type {NextApiRequest, NextApiResponse} from "next";

import simulateDatabaseConsult from "@/utils/simulateDatabaseConsult";
type Data =
  | {
      success: boolean;
      message: string;
    }
  | {
      success: boolean;

      email: string;
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST")
    return res.status(400).json({success: false, message: "Invalid Method"});

  if (req.body.email === "unregistredUser@email.com")
    return simulateDatabaseConsult(() =>
      res.status(404).json({
        success: false,
        message: `No user with the email ${req.body.email} could be found, please make sure your set the correct email or try to signup.`,
      }),
    );

  return simulateDatabaseConsult(() =>
    res.status(200).json({success: true, email: req.body.email}),
  );
}
