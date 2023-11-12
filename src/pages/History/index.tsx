/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Input, Spinner, chakra } from "@chakra-ui/react";
import TransactionCard from "../../components/TransactionCard";
import { format, parse } from "date-fns";
import { id as localeId } from "date-fns/locale";
import _ from "lodash";
import useHistoryTrxStore from "../../store/useHistoryTrx";
import { FaFilter, FaScroll } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BottomSheet } from "../../components/BottomSheet";
import FloatingButton from "../../components/FloatingButton";
import ReportModal from "./components/ReportModal";
const CFaFilter = chakra(FaFilter);
const IconReport = chakra(FaScroll);

export const History = () => {
  const initYearMonth = () => {
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    return `${currYear}-${currMonth}`;
  };
  const [showFilter, setShowFilter] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [tmpYearMonth, setTmpYearMonth] = useState(initYearMonth());
  const [fetchData, refetchData, trx, yearMonth, loading] = useHistoryTrxStore(
    (store) => [
      store.fetchData,
      store.refetchData,
      store.trx,
      store.yearMonth,
      store.loading,
    ]
  );

  useEffect(() => {
    fetchData();
  }, []);

  const onFilter = async () => {
    const y = parseInt(tmpYearMonth?.split("-")?.[0]);
    const m = parseInt(tmpYearMonth?.split("-")?.[1]);
    const res = await fetchData(y, m);
    if (res) {
      setShowFilter(false);
    }
  };

  const grouppedHistories = _.groupBy(
    trx.map((h) => ({
      ...h,
      groupLabel: format(
        parse(h.date, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date()),
        "dd MMMM yyyy",
        { locale: localeId }
      ),
      groupId: format(
        parse(h.date, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date()),
        "yy-MM-dd"
      ),
    })),
    "groupId"
  );

  const mappedHistories = _.sortBy(
    Object.keys(grouppedHistories || {}).map((k) => ({
      id: k,
      label: grouppedHistories?.[k]?.[0]?.groupLabel,
      data: grouppedHistories?.[k],
    })),
    "id"
  ).reverse();

  return (
    <Box
      backgroundColor={"white"}
      minH={"100vh"}
      textAlign="center"
      fontSize="xl"
      color={"#1D1D1D"}
    >
      <BottomSheet
        open={showFilter}
        onDismiss={() => {
          setShowFilter(false);
        }}
      >
        <Box p={4}>
          <Input
            type={"month"}
            colorScheme="purple"
            value={tmpYearMonth}
            onChange={(e) => setTmpYearMonth(e.target.value)}
            isDisabled={loading}
          />
          <Button
            mt={4}
            mb={4}
            bgColor={"#705a9d"}
            color={"#fff"}
            onClick={onFilter}
            isDisabled={loading}
            w={"100%"}
          >
            {loading ? <Spinner /> : "Filter"}
          </Button>
        </Box>
      </BottomSheet>
      <Box
        height={"60px"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        boxShadow={"1px 1px 8px 1px rgba(112,106,106,0.4)"}
      >
        <Box w={"100%"} display={"flex"}>
          <Box w={"80px"}></Box>
          <Box flex={1} display={"flex"} flexDirection={"column"}>
            <Box>History</Box>
            <Box fontSize={10} color={"grey"} mt={-1}>
              {yearMonth ? `(${yearMonth})` : ""}
            </Box>
          </Box>
          <Box w={"80px"}>
            <Button onClick={() => setShowFilter(true)}>
              <CFaFilter color={"#715D9A"} />
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        padding={"10px 24px"}
        height={"calc(100vh - (60px + 60px))"}
        overflowY={"scroll"}
        textAlign={"left"}
        pb={"50px"}
      >
        {loading && (
          <Box
            height={"calc(100vh - 200px)"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Spinner />
          </Box>
        )}
        {!loading &&
          mappedHistories.map((h, i) => (
            <div key={`${i}-${h.id}`}>
              <Box marginBottom={"16px"} fontSize={"20px"} fontWeight={500}>
                {h.label}
              </Box>
              {(h.data || []).map((d, j) => (
                <TransactionCard
                  key={j}
                  data={d}
                  hideDate
                  onAfterDelete={refetchData}
                />
              ))}
            </div>
          ))}
      </Box>
      <FloatingButton
        onClick={() => {
          setShowReport(true);
        }}
        isDisabled={loading}
      >
        <IconReport />
      </FloatingButton>
      <ReportModal open={showReport} onDismiss={() => setShowReport(false)} />
    </Box>
  );
};
