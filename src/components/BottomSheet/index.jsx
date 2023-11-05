import { BottomSheet as BS } from 'react-spring-bottom-sheet';

export const BottomSheet = props => {
  const { open, onDismiss, ...otherProps } = props;
  return (
    <BS open={open} onDismiss={onDismiss} {...otherProps}>
      {props.children}
    </BS>
  );
};
