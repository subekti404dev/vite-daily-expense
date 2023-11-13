import { Box, Button } from "@chakra-ui/react";
import { BottomSheet } from "../../../../components/BottomSheet";
import useHistoryTrxStore from "../../../../store/useHistoryTrx";
import _ from "lodash";
import { formatRupiah } from "../../../../utils/currency";

interface IReportModal {
  open: boolean;
  onDismiss: () => void;
}
const ReportModal = (props: IReportModal) => {
  const [trx] = useHistoryTrxStore((store) => [store.trx]);
  const totalTrx = _.sumBy(trx, "amount");
  const groupByCategory = _.groupBy(trx, "category_id");
  const groupByCategoryMapped = Object.keys(groupByCategory).map((g) => ({
    category_name: groupByCategory?.[g]?.[0]?.category_name,
    total: _.sumBy(groupByCategory?.[g], "amount"),
    percentage: (
      (_.sumBy(groupByCategory?.[g], "amount") / totalTrx) *
      100
    ).toFixed(2),
  }));

  const groupByPocket = _.groupBy(trx, "pocket_id");
  const groupByPocketMapped = Object.keys(groupByPocket).map((g) => ({
    pocket_name: groupByPocket?.[g]?.[0]?.pocket_name,
    total: _.sumBy(groupByPocket?.[g], "amount"),
    percentage: (
      (_.sumBy(groupByPocket?.[g], "amount") / totalTrx) *
      100
    ).toFixed(2),
  }));

  return (
    <BottomSheet open={props.open} onDismiss={props.onDismiss}>
      <Box p={"8px"} pb={"24px"}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          m={2}
          fontWeight={600}
        >
          Summary by Categories
        </Box>
        <Box fontSize={14}>
          {groupByCategoryMapped.map((g, i) => {
            return (
              <Box key={i} display={"flex"} flexDirection={"row"} p={"2px"}>
                <Box flex={3} color={"#222"}>
                  {g.category_name}
                </Box>
                <Box
                  flex={2}
                  display={"flex"}
                  justifyContent={"flex-end"}
                  mr={3}
                  color={"grey"}
                >
                  {formatRupiah(g.total, true)}
                </Box>
                <Box
                  w={"60px"}
                  display={"flex"}
                  justifyContent={"flex-end"}
                  color={"grey"}
                >
                  {g.percentage}%
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          m={2}
          fontWeight={600}
        >
          Summary by Pocket
        </Box>
        <Box fontSize={14}>
          {groupByPocketMapped.map((g, i) => {
            return (
              <Box key={i} display={"flex"} flexDirection={"row"} p={"2px"}>
                <Box flex={3} color={"#222"}>
                  {g.pocket_name}
                </Box>
                <Box
                  flex={2}
                  display={"flex"}
                  justifyContent={"flex-end"}
                  mr={3}
                  color={"grey"}
                >
                  {formatRupiah(g.total, true)}
                </Box>
                <Box
                  w={"60px"}
                  display={"flex"}
                  justifyContent={"flex-end"}
                  color={"grey"}
                >
                  {g.percentage}%
                </Box>
              </Box>
            );
          })}
        </Box>
        <Button
          variant={"outline"}
          color={"#715D9A"}
          borderColor={"#715D9A"}
          w={"100%"}
          mt={4}
          onClick={props.onDismiss}
        >
          Close
        </Button>
      </Box>
    </BottomSheet>
  );
};

export default ReportModal;
