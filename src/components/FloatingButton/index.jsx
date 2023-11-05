import { Button } from '@chakra-ui/react';

const FloatingButton = ({ onClick, children }) => {
  return (
    <Button
      position={'fixed'}
      bottom={'70px'}
      right={'20px'}
      onClick={onClick}
      backgroundColor={'#715D9A'}
      color={'#fff'}
      fontSize={'30px'}
      height={'50px'}
      width={'50px'}
      borderRadius={'18px'}
    >
      {children}
    </Button>
  );
};

export default FloatingButton;
