import {
  Box,
  HStack,
  VStack,
  Image,
  Button,
  NumberInput,
  NumberInputField,
  Spinner,
} from "@chakra-ui/react";
import { formatRupiah } from "../../../../utils/currency";
import Progress from "../../../../components/Progress";
import { useState } from "react";
import { BottomSheet } from "../../../../components/BottomSheet";
import usePocketStore, { IPocket } from "../../../../store/usePocket";

interface IPocketCard {
  data: IPocket;
  currentUsage: number;
  onAfterSetLimit: () => void;
}

const Pocket = ({ data, currentUsage, onAfterSetLimit }: IPocketCard) => {
  const { name, limit, icon, color } = data;
  const percentage = (currentUsage / limit) * 100;
  const [isShowModal, setIsShowModal] = useState(false);
  const [tmpLimit, setTmpLimit] = useState<string>("");
  const [isUpdating, setLimit] = usePocketStore((store) => [
    store.isUpdating,
    store.setLimit,
  ]);

  const handleSubmit = async () => {
    const res = await setLimit(data.id, name, parseInt(tmpLimit));
    if (res) {
      setIsShowModal(false);
      onAfterSetLimit?.();
    }
  };

  return (
    <div>
      <BottomSheet
        open={isShowModal}
        onDismiss={() => {
          setIsShowModal(false);
          setTmpLimit("");
        }}
      >
        <Box p={4}>
          <Box>
            Set Limit <b>{name}</b>
          </Box>
          <NumberInput
            mt={2}
            placeholder="ex: 100000"
            onChange={setTmpLimit}
            isDisabled={isUpdating}
          >
            <NumberInputField />
          </NumberInput>
          <Button
            mt={4}
            mb={4}
            bgColor={"#705a9d"}
            color={"#fff"}
            onClick={handleSubmit}
            isDisabled={isUpdating || !tmpLimit}
            w={"100%"}
          >
            {isUpdating ? <Spinner /> : "Set Limit"}
          </Button>
        </Box>
      </BottomSheet>
      <Box
        marginBottom={"8px"}
        onClick={() => {
          setIsShowModal(true);
        }}
      >
        <HStack>
          <Box
            w={"45px"}
            h={"45px"}
            borderRadius={"16px"}
            backgroundColor={color || "#CBF8F1"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {!!icon && (
              <Image w={30} h={30} opacity={0.3} src={`/pocket/${icon}`} />
            )}
          </Box>
          <Box flex={1} alignItems="flex-start" padding={"4px"}>
            <VStack gap={0}>
              <HStack style={{ width: "100%" }} gap={0}>
                <Box fontSize={17} flex={1} alignItems="flex-start">
                  {name}
                </Box>
                <VStack gap={0} alignItems={"flex-end"} marginBottom={"2px"}>
                  <Box fontSize={14} fontWeight={500} textAlign={"right"}>
                    {formatRupiah(currentUsage, true)}
                  </Box>
                  <Box
                    fontSize={10}
                    fontWeight={500}
                    color={"grey"}
                    textAlign={"right"}
                  >
                    /{formatRupiah(limit, true)}
                  </Box>
                </VStack>
              </HStack>
            </VStack>
            <Box>
              <Progress percentage={100 - percentage} />
            </Box>
          </Box>
          {/* <VStack>
          
          <Box fontSize={'11px'} fontWeight={600}>
            /{formatRupiah(maxAmount)}
          </Box>
        </VStack> */}
        </HStack>
      </Box>
    </div>
  );
};

export default Pocket;
