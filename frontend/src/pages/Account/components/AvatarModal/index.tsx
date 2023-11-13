import { Box, Button, Image, Spinner } from "@chakra-ui/react";
import { BottomSheet } from "../../../../components/BottomSheet";
import _ from "lodash";
import useAuthStore from "../../../../store/useAuth";
import { useEffect, useState } from "react";

interface IAvatarModal {
  open: boolean;
  onDismiss: () => void;
}
const AvatarModal = (props: IAvatarModal) => {
  const [user, changeAvatar, loadingChangeAvatar] = useAuthStore((store) => [
    store.user,
    store.changeAvatar,
    store.loadingChangeAvatar,
  ]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (user?.avatar) setSelected(user?.avatar);
  }, [user]);

  const avatars = [
    ..._.range(1, 32).map((x) => `male_${x}.png`),
    ..._.range(1, 20).map((x) => `female_${x}.png`),
  ];
  const chunkAvatars = _.chunk(avatars, 5);
  const isChanged = selected !== user?.avatar;

  return (
    <BottomSheet open={props.open} onDismiss={props.onDismiss}>
      <Box p={"8px"} pb={"24px"}>
        <Box height={"calc(100vh - 110px)"} overflowY={"scroll"}>
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
                    onClick={() => {
                      if (!loadingChangeAvatar) setSelected(ava);
                    }}
                  >
                    <Image src={`/avatar/${ava}`} />
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
        <Box display={"flex"} mt={"16px"}>
          <Button
            flex={1}
            backgroundColor={"#715D9A"}
            color={"#FFF"}
            isDisabled={loadingChangeAvatar || !isChanged}
            onClick={async () => {
              const res = await changeAvatar(selected);
              console.log(res);

              if (res) {
                props.onDismiss?.();
              }
            }}
          >
            {loadingChangeAvatar ? <Spinner /> : "Apply"}
          </Button>
          <Box w={2} />
          <Button
            flex={1}
            isDisabled={loadingChangeAvatar}
            color={"#715D9A"}
            borderColor={"#715D9A"}
            variant={"outline"}
            onClick={() => {
              if (user?.avatar) setSelected(user?.avatar);
              props.onDismiss?.();
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </BottomSheet>
  );
};

export default AvatarModal;
