import { Box, Button, Input, FormLabel, Select } from '@chakra-ui/react';
import { BottomSheet } from '../BottomSheet';
import React from 'react';

const ModalCreateTrx = ({ open, onDismiss }) => {
  const initialValue = {
    name: '',
    category: null,
    pocket: null,
  };
  const [form, setForm] = React.useState(initialValue);
  const resetForm = () => setForm(initialValue);

  const isAllFilled =
    (form.name || '').length > 2 && !!form.category && !!form.pocket;

  return (
    <BottomSheet
      open={open}
      onDismiss={() => {
        onDismiss && onDismiss();
        resetForm();
      }}
    >
      <Box margin={4} mb={10} display={'flex'} flexDirection={'column'}>
        <FormLabel>Transaction Name</FormLabel>
        <Input
          border={'1px solid #cdcdcd'}
          defaultValue={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />

        {(form.name || '').length > 2 && (
          <>
            <Box height={2} />
            <FormLabel>Category</FormLabel>
            <Select
              border={'1px solid #cdcdcd'}
              defaultValue={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              placeholder="Select a category"
            >
              <option value={'groceries'}>Groceries</option>
              <option value={'entertainment'}>Entertainment</option>
            </Select>
          </>
        )}

        {!!form.category && (
          <>
            <Box height={2} />
            <FormLabel>Pocket</FormLabel>
            <Select
              border={'1px solid #cdcdcd'}
              defaultValue={form.pocket}
              onChange={e => setForm(f => ({ ...f, pocket: e.target.value }))}
              placeholder='Select a pocket'
            >
              <option value={'weekly'}>Weekly</option>
              <option value={'monthly'}>Monthly</option>
              <option value={'fixed'}>Fixed</option>
            </Select>
          </>
        )}

        {isAllFilled && (
          <>
            <Box height={4} />
            <Button
              bgColor={'#705a9d'}
              color={'#fff'}
              mt={2}
              onClick={() => console.log(form)}
            >
              Add
            </Button>
          </>
        )}
      </Box>
    </BottomSheet>
  );
};

export default ModalCreateTrx;
