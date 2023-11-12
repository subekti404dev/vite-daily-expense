import { Box, HStack, VStack, Image } from "@chakra-ui/react";
import { formatRupiah } from "../../../../utils/currency";
import Progress from "../../../../components/Progress";
import { useState } from "react";
import { BottomSheet } from "../../../../components/BottomSheet";

const Pocket = (
  { name, currentUsage, limit, icon, color } = { currentUsage: 1, limit: 1 }
) => {
  const percentage = (currentUsage / limit) * 100;
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <div>
      <BottomSheet open={isShowModal} onDismiss={() => setIsShowModal(false)}>
        kjdsjvvdv
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
