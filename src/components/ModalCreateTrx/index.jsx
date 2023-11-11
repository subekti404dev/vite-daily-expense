import { Box, Button, Input, FormLabel, Select } from "@chakra-ui/react";
import { BottomSheet } from "../BottomSheet";
import React from "react";
import usePocketStore from "../../store/usePocket";
import useCategoryStore from "../../store/useCategory";

const ModalCreateTrx = ({ open, onDismiss }) => {
  const initialValue = {
    name: "",
    category: null,
    pocket: null,
    amount: 0,
    date: null,
  };
  const [form, setForm] = React.useState(initialValue);
  const resetForm = () => setForm(initialValue);
  const [pockets] = usePocketStore((store) => [store.pockets]);
  const [categories] = useCategoryStore((store) => [store.categories]);

  const isAllFilled =
    (form.name || "").length > 2 &&
    !!form.category &&
    !!form.pocket &&
    !!form.amount &&
    !!form.date;

  return (
    <BottomSheet
      open={open}
      onDismiss={() => {
        onDismiss && onDismiss();
        resetForm();
      }}
    >
      <Box margin={4} mb={10} display={"flex"} flexDirection={"column"}>
        <FormLabel>Transaction Name</FormLabel>
        <Input
          border={"1px solid #cdcdcd"}
          defaultValue={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />

        {(form.name || "").length > 2 && (
          <>
            <Box height={2} />
            <FormLabel>Category</FormLabel>
            <Select
              border={"1px solid #cdcdcd"}
              defaultValue={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              placeholder="Select a category"
            >
              {categories.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </>
        )}

        {!!form.category && (
          <>
            <Box height={2} />
            <FormLabel>Pocket</FormLabel>
            <Select
              border={"1px solid #cdcdcd"}
              defaultValue={form.pocket}
              onChange={(e) =>
                setForm((f) => ({ ...f, pocket: e.target.value }))
              }
              placeholder="Select a pocket"
            >
              {pockets.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </>
        )}

        {!!form.pocket && (
          <>
            <Box height={2} />
            <FormLabel>Amount</FormLabel>
            <Input
              border={"1px solid #cdcdcd"}
              defaultValue={form.amount}
              type="number"
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: parseInt(e.target.value) }))
              }
            />
          </>
        )}

        {!!form.amount && (
          <>
            <Box height={2} />
            <FormLabel>Date</FormLabel>
            <Input
              border={"1px solid #cdcdcd"}
              type="date"
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
          </>
        )}

        {isAllFilled && (
          <>
            <Box height={4} />
            <Button
              bgColor={"#705a9d"}
              color={"#fff"}
              mt={2}
              onClick={() => console.log(form)}
            >
              Add
            </Button>
          </>
        )}
      </Box>
    </BottomSheet>
  );
};

export default ModalCreateTrx;
