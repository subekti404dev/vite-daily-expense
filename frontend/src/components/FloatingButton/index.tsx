/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@chakra-ui/react";

interface IFloatingButton {
  onClick?: () => void;
  children?: any;
  isDisabled?: boolean;
}
const FloatingButton = ({ onClick, children, isDisabled }: IFloatingButton) => {
  return (
    <Button
      position={"absolute"}
      bottom={"70px"}
      right={"20px"}
      onClick={onClick}
      backgroundColor={"#715D9A"}
      color={"#fff"}
      fontSize={"30px"}
      height={"50px"}
      width={"50px"}
      borderRadius={"18px"}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
};

export default FloatingButton;
