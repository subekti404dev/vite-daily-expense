import { Box, Button, HStack, Image, VStack } from "@chakra-ui/react";
import { formatRupiah } from "../../utils/currency";
import { format, parse } from "date-fns";
import { id as localeId } from "date-fns/locale";
import useHistoryTrxStore, { ITrx } from "../../store/useHistoryTrx";
import { useState } from "react";
import { BottomSheet } from "../BottomSheet";

interface ITransactionCard {
  data: ITrx;
  hideName?: boolean;
  hideDate?: boolean;
  onAfterDelete?: () => void;
}

const TransactionCard = ({
  data,
  hideName,
  hideDate,
  onAfterDelete,
}: ITransactionCard) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isDeleting, doDelete] = useHistoryTrxStore((store) => [
    store.loadingDelete,
    store.delete,
  ]);
  const { name, category_name, amount, date, user_name, pocket_name } = data;
  const parsedDate = () =>
    parse(date as string, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date());
  return (
    <>
      <BottomSheet
        open={showModalDelete}
        onDismiss={() => setShowModalDelete(false)}
      >
        <Box p={"4px 8px"}>
          <Box>Are you sure want to delete this transaction?</Box>
          <Box m={"4px 12px 8px"} color={"grey"} fontStyle={"italic"}>
            {name} - {formatRupiah(amount)}
          </Box>
          <Box display={"flex"} mt={2} mb={2}>
            <Button
              flex={1}
              backgroundColor="#715D9A"
              color={"#fff"}
              isDisabled={isDeleting}
              onClick={async () => {
                const res = await doDelete(data.id);
                if (res) {
                  onAfterDelete?.();
                  setShowModalDelete(false);
                }
              }}
            >
              Sure, Delete
            </Button>
            <Box w={2} />
            <Button
              flex={1}
              color="#715D9A"
              borderColor={"#715D9A"}
              variant={"outline"}
              isDisabled={isDeleting}
              onClick={() => setShowModalDelete(false)}
            >
              No, Thanks
            </Button>
          </Box>
        </Box>
      </BottomSheet>
      <Box marginBottom={"8px"} onClick={() => setShowModalDelete(true)}>
        <HStack>
          <Box
            w={"48px"}
            h={"48px"}
            borderRadius={"16px"}
            backgroundColor={data.pocket_color || "#CBF8F1"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {!!data.user_avatar && (
              <Image opacity={0.7} src={`/avatar/${data.user_avatar}`} />
            )}
          </Box>
          <Box flex={1} alignItems="flex-start" padding={"4px"}>
            {!hideDate && !!date && (
              <Box fontSize={"10px"} color={"#686868"}>
                {format(parsedDate(), "dd MMMM yyyy", { locale: localeId })}
              </Box>
            )}
            {!hideName && !!user_name && (
              <Box fontSize={"10px"} color={"#686868"}>
                {user_name}
              </Box>
            )}

            <Box fontSize={"16px"}>{name}</Box>
            <Box fontSize={"12px"} color={"#C0C0C0"}>
              {category_name}
            </Box>
          </Box>
          <VStack gap={0} display={"flex"} alignItems={"flex-end"}>
            <Box fontSize={"9px"} color={"#C0C0C0"}>
              {pocket_name}
            </Box>
            <Box fontSize={"16px"} fontWeight={600}>
              {formatRupiah(amount, true)}
            </Box>
          </VStack>
        </HStack>
      </Box>
    </>
  );
};

export default TransactionCard;
