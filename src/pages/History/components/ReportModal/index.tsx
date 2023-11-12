import { Box } from "@chakra-ui/react";
import { BottomSheet } from "../../../../components/BottomSheet";
import useHistoryTrxStore from "../../../../store/useHistoryTrx";

interface IReportModal {
  open: boolean;
  onDismiss: () => void;
}
const ReportModal = (props: IReportModal) => {
  const [trx] = useHistoryTrxStore((store) => [store.trx]);
  console.log(trx);

  return (
    <BottomSheet open={props.open} onDismiss={props.onDismiss}>
      <Box>Report</Box>
    </BottomSheet>
  );
};

export default ReportModal;
