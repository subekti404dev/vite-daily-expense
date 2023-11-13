import _ from "lodash";
import pb from "../utils/pocketbase.util";

const getPocketsByIds = async (ids: string[] = []) => {
  const filter = ids.map((id) => `id = '${id}'`).join(" || ");
  const { items } = await pb.collection("exp_pockets").getList(1, 1000, {
    filter,
  });
  return items || [];
};

const getCategoriesByIds = async (ids: string[] = []) => {
  const filter = ids.map((id) => `id = '${id}'`).join(" || ");
  const { items } = await pb.collection("exp_categories").getList(1, 1000, {
    filter,
  });
  return items || [];
};

const getUsersByIds = async (ids: string[] = []) => {
  const filter = ids.map((id) => `id = '${id}'`).join(" || ");
  const { items } = await pb.collection("exp_users").getList(1, 1000, {
    filter,
  });
  return items || [];
};

export const populateTrx = async (transactions: any = []) => {
  const [pockets, categories, users] = await Promise.all([
    getPocketsByIds(
      _.uniqBy(transactions, "pocket_id").map((t: any) => t.pocket_id)
    ),
    getCategoriesByIds(
      _.uniqBy(transactions, "category_id").map((t: any) => t.category_id)
    ),
    getUsersByIds(_.uniqBy(transactions, "user_id").map((t: any) => t.user_id)),
  ]);

  return transactions.map((t: any) => {
    const pocket = pockets.find((p: any) => p.id === t.pocket_id);
    const category = categories.find((p: any) => p.id === t.category_id);
    const user = users.find((p: any) => p.id === t.user_id);
    return {
      ...t,
      pocket_name: pocket?.name,
      pocket_color: pocket?.color,
      pocket_icon: pocket?.icon,
      category_name: category?.name,
      user_name: user?.name,
      user_avatar: user?.avatar,
    };
  });
};

export const trxByMonth = async (
  year: number,
  month: number,
  workspace_id: string
) => {
  const startDate = `${year}-${month < 10 ? `0${month}` : month}-01`;
  let nextYear = year;
  let nextMonth = month + 1;
  if (nextMonth > 12) {
    nextYear++;
    nextMonth = 1;
  }
  const endDate = `${nextYear}-${
    nextMonth < 10 ? `0${nextMonth}` : nextMonth
  }-01`;

  const { items: transactions } = await pb
    .collection("exp_transactions")
    .getList(1, 1000, {
      filter: `workspace_id = '${workspace_id}' && deleted = false && date >= '${startDate}' && date < '${endDate}'`,
      sort: "-date, -created",
    });

  const data = await populateTrx(transactions);
  return data;
};
