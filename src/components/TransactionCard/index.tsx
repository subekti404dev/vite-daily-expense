import { Box, HStack, Image, VStack } from "@chakra-ui/react";
import { formatRupiah } from "../../utils/currency";
import { format, parse } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ITrx } from "../../store/useHistoryTrx";

interface ITransactionCard {
  data: ITrx;
  hideName?: boolean;
  hideDate?: boolean;
}

const TransactionCard = ({ data, hideName, hideDate }: ITransactionCard) => {
  const { name, category_name, amount, date, user_name, pocket_name } = data;
  const parsedDate = () =>
    parse(date as string, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date());
  return (
    <Box marginBottom={"8px"}>
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
  );
};

export default TransactionCard;
