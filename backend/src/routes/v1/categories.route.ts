import express, { Request, Response } from "express";
import pb from "../../utils/pocketbase.util";
import { validateRequiredFields } from "../../utils/field-validation.util";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { workspace_id } = res.locals || {};
    if (!workspace_id) throw Error("Workspace id empty");
    const { items: categories } = await pb
      .collection("exp_categories")
      .getList(1, 1000, {
        filter: `workspace_id = '${workspace_id}' && deleted = false`,
      });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { workspace_id } = res.locals || {};
    if (!workspace_id) throw Error("Workspace id empty");
    const { name } = req.body || {};
    validateRequiredFields({ name });

    const data = {
      name,
      workspace_id,
      deleted: false,
    };

    const category = await pb.collection("exp_categories").create(data);

    res.json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { workspace_id } = res.locals || {};
    if (!workspace_id) throw Error("Workspace id empty");
    const { name } = req.body || {};
    const { id } = req.params;
    validateRequiredFields({ id, name });

    const data = {
      name,
      workspace_id,
      deleted: false,
    };

    const category = await pb.collection("exp_categories").update(id, data);

    res.json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { workspace_id } = res.locals || {};
    if (!workspace_id) throw Error("Workspace id empty");
    const { id } = req.params;

    const data = {
      workspace_id,
      deleted: true,
    };

    await pb.collection("exp_categories").update(id, data);

    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
export default router;
