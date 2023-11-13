import express, { Request, Response } from "express";
import pb from "../../utils/pocketbase.util";
import { validateRequiredFields } from "../../utils/field-validation.util";

const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {
  try {
    const { items: users } = await pb.collection("exp_users").getList(1, 1, {
      filter: `id = '${res.locals.user_id}' && deleted = false`,
    });
    if (users.length === 0) throw Error("User not found");
    res.json({
      success: true,
      data: users?.[0],
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/partners", async (req: Request, res: Response) => {
  try {
    const { workspace_id } = res.locals || {};
    if (!workspace_id) throw Error("Workspace empty");

    const { items: users } = await pb.collection("exp_users").getList(1, 1000, {
      filter: `workspace_id = '${workspace_id}' && deleted = false`,
    });
    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/avatar", async (req: Request, res: Response) => {
  try {
    const { workspace_id, user_id } = res.locals || {};
    const { avatar } = req.body || {};
    validateRequiredFields({ workspace_id, avatar, user_id });

    const { items: users } = await pb
      .collection("exp_users")
      .update(user_id, { avatar });
    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
