import { Box, HStack, VStack } from "@chakra-ui/react";
import { formatRupiah } from "../../utils/currency";
import { format, parse } from "date-fns";
import { id as localeId } from "date-fns/locale";

const TransactionCard = ({ name, category, nominal, date }) => {
  const parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date());
  return (
    <Box marginBottom={"8px"}>
      <HStack>
        <Box
          w={"48px"}
          h={"48px"}
          borderRadius={"16px"}
          backgroundColor={"#CBF8F1"}
        ></Box>
        <Box flex={1} alignItems="flex-start" padding={"4px"}>
          {!!date && (
            <Box fontSize={"10px"}>
              {format(parsedDate, "dd MMMM yyyy", { locale: localeId })}
            </Box>
          )}
          <Box fontSize={"16px"}>{name}</Box>
          <Box fontSize={"14px"} color={"#C0C0C0"}>
            {category}
          </Box>
        </Box>
        <VStack>
          <Box fontSize={"16px"} fontWeight={600}>
            {formatRupiah(nominal, true)}
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default TransactionCard;
