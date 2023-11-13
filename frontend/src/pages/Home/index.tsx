/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, HStack, Image, chakra } from "@chakra-ui/react";
import _ from "lodash";
import { formatRupiah } from "../../utils/currency";
import { WhiteCircle } from "../../assets/images";
import { useEffect, useState } from "react";
import Pocket from "./components/Pocket";
import TransactionCard from "../../components/TransactionCard";
import FloatingButton from "../../components/FloatingButton";
import ModalCreateTrx from "../../components/ModalCreateTrx";
import useAuthStore from "../../store/useAuth";
import usePocketStore from "../../store/usePocket";
import useMonthlyTrxStore from "../../store/useMonthlyTrx";
import useCategoryStore from "../../store/useCategory";
import { FaPlus } from "react-icons/fa";
import TrxSkeleton from "../../components/TrxSkeleton";

const PlusIcon = chakra(FaPlus);

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthStore((store) => [store.user]);
  const [fetchPocket, pockets, loadingPocket] = usePocketStore((store) => [
    store.fetchData,
    store.pockets,
    store.loading,
  ]);

  const [fetchCategories] = useCategoryStore((store) => [store.fetchData]);
  const [fetchMonthTrx, monthTrx, loadingMonthTrx] = useMonthlyTrxStore(
    (store) => [store.fetchData, store.trx, store.loading]
  );

  const fetchAllData = async () => {
    await Promise.all([fetchPocket(), fetchMonthTrx(), fetchCategories()]);
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  const fullPocket = (pockets || []).map((p) => {
    const currentUsage = _.sumBy(
      (monthTrx || []).filter((t) => t.pocket_id === p.id),
      "amount"
    );
    return { ...p, currentUsage };
  });

  const loading = loadingPocket || loadingMonthTrx;

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
              >
                {!!user?.avatar && <Image src={`/avatar/${user.avatar}`} />}
              </Box>
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
              {formatRupiah(_.sumBy(monthTrx, "amount"), true)}
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
          {loading && (
            <>
              <TrxSkeleton />
              <TrxSkeleton />
              <TrxSkeleton />
            </>
          )}
          {!loading &&
            (monthTrx || []).slice(0, 3).map((t, i) => {
              return (
                <TransactionCard
                  key={i}
                  data={t}
                  hideName
                  onAfterDelete={fetchAllData}
                />
              );
            })}
        </Box>
        <Box margin={"24px"} textAlign={"left"}>
          <Box marginBottom={"16px"} fontSize={"20px"} fontWeight={500}>
            My Pockets
          </Box>
          {loading && (
            <>
              <TrxSkeleton />
              <TrxSkeleton />
            </>
          )}
          {!loading &&
            fullPocket.map((t, i: number) => {
              return (
                <Pocket
                  key={i}
                  data={t}
                  currentUsage={t.currentUsage}
                  onAfterSetLimit={fetchAllData}
                />
              );
            })}
        </Box>
        <FloatingButton onClick={() => setOpen(true)}>
          <PlusIcon />
        </FloatingButton>
        <ModalCreateTrx
          open={open}
          onDismiss={() => setOpen(false)}
          onFinish={fetchAllData}
        />
      </Box>
    </>
  );
};
