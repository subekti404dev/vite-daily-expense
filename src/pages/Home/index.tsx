import { Box, Grid, HStack, Image } from "@chakra-ui/react";
import { formatRupiah } from "../../utils/currency";
import { WhiteCircle } from "../../assets/images";
import { useState } from "react";
import Pocket from "./components/Pocket";
import TransactionCard from "../../components/TransactionCard";
import FloatingButton from "../../components/FloatingButton";
import ModalCreateTrx from "../../components/ModalCreateTrx";
import useAuthStore from "../../store/useAuth";

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthStore((store) => [store.user]);
  const trx = [
    {
      id: 1,
      name: "Belanja Indomaret",
      category: "Groceries",
      nominal: 30000,
      date: "2023-09-11T07:20:50Z",
    },
    {
      id: 2,
      name: "Nonton Ant-Man",
      category: "Entertainment",
      nominal: 100000,
      date: "2023-09-11T07:20:50Z",
    },
    {
      id: 3,
      name: "Makan di McD",
      category: "Food and Beverage",
      nominal: 200000,
      date: "2023-09-11T07:20:50Z",
    },
  ];
  const pockets = [
    {
      id: 1,
      name: "Daily Expenses",
      currentAmount: 300000,
      maxAmount: 1000000,
    },
    {
      id: 2,
      name: "Fixed Expenses",
      currentAmount: 800000,
      maxAmount: 1000000,
    },
  ];
  return (
    <>
      <Box
        backgroundColor={"#705a9d"}
        borderBottomLeftRadius={"20px"}
        borderBottomRightRadius={"20px"}
        height={"175px"}
        padding={"12px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        color={"#FFF"}
      >
        <Image
          src={WhiteCircle}
          position={"absolute"}
          w={250}
          h={250}
          opacity={0.05}
          top={-100}
        />
        <Image
          src={WhiteCircle}
          position={"absolute"}
          w={100}
          h={100}
          opacity={0.05}
          right={5}
          top={100}
        />
        <Box position={"absolute"} width={"calc(100% - 24px)"}>
          <Grid marginBottom={"24px"}>
            <HStack>
              <Box
                backgroundColor={"#F5C2B3"}
                w={"50px"}
                h={"50px"}
                borderRadius={"16px"}
              ></Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"flex-start"}
              >
                <Box fontSize={"12px"} color={"#bfbfbf"}>
                  Welcome Back,
                </Box>
                <Box fontSize={"18px"} fontWeight={500}>
                  {user?.name}
                </Box>
              </Box>
            </HStack>
          </Grid>
          <Box
            display={"flex"}
            w={"100%"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom={4}
          >
            <Box fontSize={15} color={"rgba(255,255,255,0.6)"}>
              Total Expense This Month
            </Box>
            <Box fontSize={26} fontWeight={600}>
              {formatRupiah(200000, true)}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        backgroundColor={"#FFF"}
        height={"calc(100vh - 235px)"}
        textAlign="center"
        overflowY={"scroll"}
        fontSize="xl"
        color={"#1D1D1D"}
        paddingBottom={12}
      >
        <Box margin={"24px"} textAlign={"left"}>
          <Box marginBottom={"16px"} fontSize={"20px"} fontWeight={500}>
            Recent Transactions
          </Box>
          {trx.map((t, i) => {
            return (
              <TransactionCard
                key={i}
                name={t.name}
                category={t.category}
                nominal={t.nominal}
                date={t.date}
              />
            );
          })}
        </Box>
        <Box margin={"24px"} textAlign={"left"}>
          <Box marginBottom={"16px"} fontSize={"20px"} fontWeight={500}>
            My Pockets
          </Box>
          {pockets.map((t, i) => {
            return (
              <Pocket
                key={i}
                name={t.name}
                currentAmount={t.currentAmount}
                maxAmount={t.maxAmount}
              />
            );
          })}
        </Box>
        <FloatingButton onClick={() => setOpen(true)}>+</FloatingButton>
        <ModalCreateTrx open={open} onDismiss={() => setOpen(false)} />
      </Box>
    </>
  );
};
