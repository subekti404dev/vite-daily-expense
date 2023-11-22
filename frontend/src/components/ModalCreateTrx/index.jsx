import {
  Box,
  Button,
  Input,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
  Spinner,
} from "@chakra-ui/react";
import { BottomSheet } from "../BottomSheet";
import React from "react";
import usePocketStore from "../../store/usePocket";
import useCategoryStore from "../../store/useCategory";
import useCreateTrxStore from "../../store/useCreateTrx";

const ModalCreateTrx = ({ open, onDismiss, onFinish }) => {
  const initialValue = {
    name: "",
    category_id: null,
    pocket_id: null,
    amount: 0,
    date: new Date().toISOString().split("T")?.[0],
  };
  const [form, setForm] = React.useState(initialValue);
  const resetForm = () => setForm(initialValue);
  const [pockets] = usePocketStore((store) => [store.pockets]);
  const [categories] = useCategoryStore((store) => [store.categories]);
  const [create, loading] = useCreateTrxStore((store) => [
    store.createTrx,
    store.loading,
  ]);

  const handleSubmit = async () => {
    const data = await create(form);
    if (data) {
      onDismiss?.();
      onFinish?.();
      resetForm();
    }
  };

  const isAllFilled =
    (form.name || "").length > 2 &&
    !!form.category_id &&
    !!form.pocket_id &&
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
          isDisabled={loading}
        />

        {(form.name || "").length > 2 && (
          <>
            <Box height={2} />
            <FormLabel>Category</FormLabel>
            <Select
              border={"1px solid #cdcdcd"}
              defaultValue={form.category_id}
              onChange={(e) =>
                setForm((f) => ({ ...f, category_id: e.target.value }))
              }
              isDisabled={loading}
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

        {!!form.category_id && (
          <>
            <Box height={2} />
            <FormLabel>Pocket</FormLabel>
            <Select
              border={"1px solid #cdcdcd"}
              defaultValue={form.pocket_id}
              onChange={(e) =>
                setForm((f) => ({ ...f, pocket_id: e.target.value }))
              }
              placeholder="Select a pocket"
              isDisabled={loading}
            >
              {pockets.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </>
        )}

        {!!form.pocket_id && (
          <>
            <Box height={2} />
            <FormLabel>Amount</FormLabel>
            <NumberInput
              borderColor={"#cdcdcd"}
              value={form.amount}
              onChange={(e) => {
                let value = e;
                if (e.startsWith("0")) {
                  value = value.slice(1);
                }
                setForm((f) => ({ ...f, amount: value }));
              }}
              isDisabled={loading}
            >
              <NumberInputField />
            </NumberInput>
          </>
        )}

        {!!form.amount && (
          <>
            <Box height={2} />
            <FormLabel>Date</FormLabel>
            <Input
              border={"1px solid #cdcdcd"}
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              isDisabled={loading}
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
              onClick={handleSubmit}
              isDisabled={loading}
            >
              {loading ? <Spinner /> : "Add"}
            </Button>
          </>
        )}
      </Box>
    </BottomSheet>
  );
};

export default ModalCreateTrx;
