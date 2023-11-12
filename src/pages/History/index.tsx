/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Spinner } from "@chakra-ui/react";
import TransactionCard from "../../components/TransactionCard";
import { format, parse } from "date-fns";
import { id as localeId } from "date-fns/locale";
import _ from "lodash";
import useHistoryTrxStore from "../../store/useHistoryTrx";
import { useEffect, useState } from "react";

export const History = () => {
  const initYearMonth = () => {
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    return `${currYear}-${currMonth}`;
  };
  const [yearMonth] = useState(initYearMonth());
  const [fetchData, trx, loading] = useHistoryTrxStore((store) => [
    store.fetchData,
    store.trx,
    store.loading,
  ]);

  useEffect(() => {
    fetchData();
  }, []);

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
      <Box
        height={"60px"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        boxShadow={"1px 1px 8px 1px rgba(112,106,106,0.4)"}
      >
        History ({yearMonth})
      </Box>
      <Box
        padding={"10px 24px"}
        height={"calc(100vh - (60px + 60px))"}
        overflowY={"scroll"}
        textAlign={"left"}
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
                <TransactionCard key={j} data={d} hideDate />
              ))}
            </div>
          ))}
      </Box>
    </Box>
  );
};
