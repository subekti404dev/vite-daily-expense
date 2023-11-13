import express, { Request, Response } from "express";
import _ from "lodash";
import pb from "../../utils/pocketbase.util";
import { validateRequiredFields } from "../../utils/field-validation.util";
import { populateTrx, trxByMonth } from "../../utils/trx.util";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { workspace_id } = res.locals || {};
    const { page, limit } = req.query || {};

    if (!workspace_id) throw Error("Workspace id empty");
    const { items: transactions } = await pb
      .collection("exp_transactions")
      .getList(page || 1, limit || 1000, {
        filter: `workspace_id = '${workspace_id}' && deleted = false`,
        sort: "-date, -created",
      });

    const data = await populateTrx(transactions);
    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/month/:year_month", async (req: Request, res: Response) => {
  try {
    const { workspace_id } = res.locals || {};
    const { year_month } = req.params || {};
    validateRequiredFields({ workspace_id, year_month });

    let year = 2023,
      month = 11;

    try {
      year = parseInt(year_month.split("-")?.[0]);
    } catch (error) {}

    try {
      month = parseInt(year_month.split("-")?.[1]);
    } catch (error) {}

    const data = await trxByMonth(year, month, workspace_id);

    res.json({
      success: true,
      data,
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
    const { workspace_id, user_id } = res.locals || {};
    validateRequiredFields({ workspace_id, user_id });

    const { name, amount, date, category_id, pocket_id } = req.body || {};
    validateRequiredFields({ name, amount, date, category_id, pocket_id });

    const data = {
      name,
      workspace_id,
      amount,
      date,
      category_id,
      pocket_id,
      user_id,
      deleted: false,
    };

    const trx = await pb.collection("exp_transactions").create(data);

    res.json({
      success: true,
      data: trx,
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
    const { workspace_id, user_id } = res.locals || {};
    validateRequiredFields({ workspace_id, user_id });
    const { id } = req.params;

    const { name, amount, date, category_id, pocket_id } = req.body || {};
    validateRequiredFields({ id, name, amount, date, category_id, pocket_id });

    const data = {
      name,
      workspace_id,
      amount,
      date,
      category_id,
      pocket_id,
      user_id,
      deleted: false,
    };

    const trx = await pb.collection("exp_transactions").update(id, data);

    res.json({
      success: true,
      data: trx,
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

    await pb.collection("exp_transactions").update(id, data);

    res.json({
      success: true,
      message: "trx deleted",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
export default router;
