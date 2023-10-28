import React from 'react';
import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { addItem } from '../api/grocery';
const AddItem = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState('pending');
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const { isLoggedIn, user } = useAuth();

  const handleGroceryCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: 'You must be logged in to create a Grocery list',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const grocery = {
      title,
      description,
      status,
      userId: user.uid,
    };
    await addItem(grocery);
    setIsLoading(false);

    setTitle('');
    setDescription('');
    setStatus('pending');

    toast({ title: 'Grocery item added', status: 'success' });
  };

  return (
    <Box w="40%" margin={'0 auto'} display="block" mt={5}>
      <Stack direction="column">
        <Input
          placeholder="Item"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Amount"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          onClick={() => handleGroceryCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          variantColor="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddItem;
