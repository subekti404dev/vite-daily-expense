import express, { Request, Response } from "express";
import md5 from "md5";
import pb from "../../utils/pocketbase.util";
import { generateJwt } from "../../utils/jwt.util";
import { validateRequiredFields } from "../../utils/field-validation.util";
const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    validateRequiredFields({ email, password });

    const passHash = md5(password);

    const { items: users } = await pb.collection("exp_users").getList(1, 1, {
      filter: `email = '${email}' && hash_password = '${passHash}'`,
    });

    if (users.length === 0) throw Error("Invalid Email or Password");

    const user = users[0];
    res.json({
      success: true,
      token: generateJwt(user),
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
