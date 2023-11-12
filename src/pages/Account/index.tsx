import { Box, Button, Image } from "@chakra-ui/react";
import useAuthStore from "../../store/useAuth";
import { useState } from "react";
import AvatarModal from "./components/AvatarModal";

export const AccountPage = () => {
  const [user, partners, logout] = useAuthStore((store) => [
    store.user,
    store.partners,
    store.logout,
  ]);
  const [showChangeAvatar, setShowChangeAvatar] = useState(false);

  return (
    <Box
      backgroundColor={"#EEE"}
      minH={"100vh"}
      textAlign="center"
      fontSize="xl"
      color={"#1D1D1D"}
    >
      <AvatarModal
        open={showChangeAvatar}
        onDismiss={() => setShowChangeAvatar(false)}
      />
      <Box
        background={
          "linear-gradient(70deg, rgba(113,93,154,1) 0%, rgba(144,125,182,1) 59%, rgba(255,255,255,1) 100%)"
        }
        width={"100%"}
        height={150}
        display={"flex"}
        justifyContent={"center"}
        position={"relative"}
        borderBottomLeftRadius={32}
      >
        {user?.avatar && (
          <Box
            w={100}
            h={100}
            backgroundColor={"#faca71"}
            borderRadius={30}
            bottom={-5}
            position={"absolute"}
            border={"2px solid #FFF"}
            onClick={() => setShowChangeAvatar(true)}
          >
            <Image src={`/avatar/${user?.avatar}`} />
          </Box>
        )}
      </Box>
      <Box mt={7}>
        <Box fontWeight={600}>{user?.name}</Box>
        <Box fontSize={10} color={"grey"}>
          {user?.email}
        </Box>
      </Box>
      <Box mt={8}>
        <Box
          ml={4}
          mr={4}
          backgroundColor={"#fff"}
          borderRadius={16}
          p={"8px"}
          display={"flex"}
          flexDirection={"column"}
          fontSize={14}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            p={"8px"}
            borderBottom={"1px solid #dedede"}
          >
            <Box flex={1} display={"flex"} justifyContent={"flex-start"}>
              Workspace ID
            </Box>
            <Box
              flex={1}
              display={"flex"}
              justifyContent={"flex-end"}
              color={"grey"}
            >
              {user?.workspace_id}
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            p={"8px"}
            borderBottom={"1px solid #dedede"}
          >
            <Box flex={1} display={"flex"} justifyContent={"flex-start"}>
              Partners
            </Box>
            <Box
              flex={1}
              display={"flex"}
              alignItems={"flex-end"}
              flexDirection={"column"}
              color={"grey"}
            >
              {partners
                .filter((p) => p.id !== user?.id)
                .map((p) => (
                  <Box key={p.id} display={"flex"} alignItems={"center"}>
                    <Box
                      w={"20px"}
                      h={"20px"}
                      backgroundColor={"orange"}
                      borderRadius={50}
                      mr={1}
                    >
                      <Image src={`/avatar/${p.avatar}`} />
                    </Box>
                    <Box>{p.name}</Box>
                  </Box>
                ))}
            </Box>
          </Box>
          <Box display={"flex"} flexDirection={"row"} p={"8px"}>
            <Box flex={1} display={"flex"} justifyContent={"flex-start"}></Box>
            <Box
              flex={1}
              display={"flex"}
              alignItems={"flex-end"}
              flexDirection={"column"}
              color={"grey"}
              onClick={logout}
            >
              <Button size={"sm"}>Logout</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
