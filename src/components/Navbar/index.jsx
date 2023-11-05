import { Box, Button, Image } from '@chakra-ui/react';
import {
  HistoryGreyIcon,
  HistoryIcon,
  HomeGreyIcon,
  HomeIcon,
  UserGreyIcon,
  UserIcon,
} from '../../assets/icons';

const navbars = [
  {
    name: 'Home',
    icon: {
      active: HomeIcon,
      inactive: HomeGreyIcon,
    },
  },
  {
    name: 'History',
    icon: {
      active: HistoryIcon,
      inactive: HistoryGreyIcon,
    },
  },
  {
    name: 'Account',
    icon: {
      active: UserIcon,
      inactive: UserGreyIcon,
    },
  },
];

const NavbarItem = ({ children, isActive, onClick, isFirst, isLast }) => {
  return (
    <Button
      display={'flex'}
      flexDirection={'column'}
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      color={isActive ? '#000' : 'grey'}
      onClick={onClick}
      fontWeight={isActive ? 500 : 400}
      w={'100%'}
      h={'100%'}
      borderTopLeftRadius={isFirst ? 12 : 0}
      borderTopRightRadius={isLast ? 12 : 0}
    >
      {children}
    </Button>
  );
};

export const Navbar = ({ activeIndex, onChange }) => {
  return (
    <Box
      position={'absolute'}
      zIndex={2}
      bottom={0}
      backgroundColor={'#FFF'}
      color={'#000'}
      width={'100%'}
      maxW={'480px'}
      height={'60px'}
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
    >
      {navbars.map((n, i) => {
        const isActive = activeIndex === i;
        const isFirst = i === 0;
        const isLast = i === navbars.length - 1;

        return (
          <NavbarItem
            key={i}
            isActive={isActive}
            onClick={() => onChange(i)}
            isFirst={isFirst}
            isLast={isLast}
          >
            <Image
              src={isActive ? n.icon.active : n.icon.inactive}
              w={isActive ? '24px' : '22px'}
              h={isActive ? '24px' : '22px'}
            />
            <Box
              fontSize={12}
              fontWeight={isActive ? 'bold' : 'normal'}
              color={isActive ? '#705a9d' : 'grey'}
              marginTop={1}
            >
              {n.name}
            </Box>
          </NavbarItem>
        );
      })}
    </Box>
  );
};
