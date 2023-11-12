/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@chakra-ui/react";
import { BottomSheet } from "../BottomSheet";

interface IConfirmModal {
  open: boolean;
  onDismiss: () => void;
  onOk: () => void;
  children: any;
  okLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}
const ConfirmModal = ({
  open,
  onDismiss,
  children,
  onOk,
  okLabel,
  cancelLabel,
  isLoading,
}: IConfirmModal) => {
  return (
    <BottomSheet open={open} onDismiss={onDismiss}>
      <Box p={"8px 12px"}>
        {children}
        <Box display={"flex"} mt={2} mb={2}>
          <Button
            flex={1}
            backgroundColor="#715D9A"
            color={"#fff"}
            isDisabled={isLoading}
            onClick={onOk}
          >
            {okLabel || "Ok"}
          </Button>
          <Box w={2} />
          <Button
            flex={1}
            color="#715D9A"
            borderColor={"#715D9A"}
            variant={"outline"}
            isDisabled={isLoading}
            onClick={onDismiss}
          >
            {cancelLabel || "Cancel"}
          </Button>
        </Box>
      </Box>
    </BottomSheet>
  );
};

export default ConfirmModal;
