import { Box, Image } from "@chakra-ui/react";
import { BottomSheet } from "../../../../components/BottomSheet";
import _ from "lodash";
import useAuthStore from "../../../../store/useAuth";
import { useEffect, useState } from "react";

interface IAvatarModal {
  open: boolean;
  onDismiss: () => void;
}
const AvatarModal = (props: IAvatarModal) => {
  const [user] = useAuthStore((store) => [store.user]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (user?.avatar) setSelected(user?.avatar);
  }, [user]);

  const avatars = [
    ..._.range(1, 32).map((x) => `male_${x}.png`),
    ..._.range(1, 20).map((x) => `female_${x}.png`),
  ];
  const chunkAvatars = _.chunk(avatars, 5);

  return (
    <BottomSheet open={props.open} onDismiss={props.onDismiss}>
      <Box p={"8px"} pb={"24px"}>
        {chunkAvatars.map((r, i) => (
          <Box display={"flex"} flexDirection={"row"} key={i}>
            {r.map((ava, j) => {
              const isSelected = selected === ava;
              return (
                <Box
                  key={`${i}-${j}`}
                  flex={1}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  backgroundColor={isSelected ? "orange" : undefined}
                  borderRadius={20}
                >
                  <Image src={`/avatar/${ava}`} />
                </Box>
              );
            })}
          </Box>
        ))}
        <Box></Box>
      </Box>
    </BottomSheet>
  );
};

export default AvatarModal;
