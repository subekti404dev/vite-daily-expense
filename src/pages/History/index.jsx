import { Box } from '@chakra-ui/react';
import TransactionCard from '../../components/TransactionCard';
import { format, parse } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';

export const History = () => {
  const histories = [
    {
      id: 1,
      name: 'Belanja Indomaret',
      category: 'Groceries',
      nominal: 30000,
      date: '2023-10-12T07:20:50Z',
    },
    {
      id: 2,
      name: 'Nonton Ant-Man',
      category: 'Entertainment',
      nominal: 100000,
      date: '2023-10-11T07:20:50Z',
    },
    {
      id: 3,
      name: 'Makan di McD',
      category: 'Food and Beverage',
      nominal: 200000,
      date: '2023-10-10T07:20:50Z',
    },
    {
      id: 4,
      name: 'Belanja Indomaret',
      category: 'Groceries',
      nominal: 30000,
      date: '2023-10-09T07:20:50Z',
    },
    {
      id: 5,
      name: 'Nonton Ant-Man',
      category: 'Entertainment',
      nominal: 100000,
      date: '2023-09-12T07:20:50Z',
    },
    {
      id: 6,
      name: 'Makan di McD',
      category: 'Food and Beverage',
      nominal: 200000,
      date: '2023-09-12T07:20:50Z',
    },
    {
      id: 7,
      name: 'Belanja Indomaret',
      category: 'Groceries',
      nominal: 30000,
      date: '2023-09-11T07:20:50Z',
    },
    {
      id: 8,
      name: 'Nonton Ant-Man',
      category: 'Entertainment',
      nominal: 100000,
      date: '2023-09-10T07:20:50Z',
    },
    {
      id: 9,
      name: 'Makan di McD',
      category: 'Food and Beverage',
      nominal: 200000,
      date: '2023-09-09T07:20:50Z',
    },
  ];

  const grouppedHistories = groupBy(
    sortBy(
      histories.map(h => ({
        ...h,
        groupLabel: format(
          parse(h.date, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date()),
          'MMMM yy',
          { locale: localeId }
        ),
        groupId: format(
          parse(h.date, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date()),
          'yy-MM'
        ),
      })),
      'date'
    ).reverse(),
    'groupId'
  );

  const mappedHistories = sortBy(
    Object.keys(grouppedHistories || {}).map(k => ({
      id: k,
      label: grouppedHistories?.[k]?.[0]?.groupLabel,
      data: grouppedHistories?.[k],
    })),
    'id'
  ).reverse();

  return (
    <Box
      backgroundColor={'white'}
      minH={'100vh'}
      textAlign="center"
      fontSize="xl"
      color={'#1D1D1D'}
    >
      <Box
        height={'60px'}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        boxShadow={'1px 1px 8px 1px rgba(112,106,106,0.4)'}
      >
        History
      </Box>
      <Box
        padding={'10px 24px'}
        height={'calc(100vh - (60px + 60px))'}
        overflowY={'scroll'}
        textAlign={'left'}
      >
        {mappedHistories.map((h, i) => (
          <div key={`${i}-${h.id}`}>
            <Box marginBottom={'16px'} fontSize={'20px'} fontWeight={500}>
              {h.label}
            </Box>
            {(h.data || []).map((d, j) => (
              <TransactionCard
                key={j}
                name={d.name}
                category={d.category}
                nominal={d.nominal}
                date={d.date}
              />
            ))}
          </div>
        ))}
      </Box>
    </Box>
  );
};
