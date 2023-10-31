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
import useAuth from '../../Assignment10/hooks/useAuth';
import { addEvent } from '../api/events';
const AddEvent = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const { isLoggedIn, user } = useAuth();

  const handleEventCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: 'You must be logged in to create an event',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const event = {
      userId: user.uid,
      title: title,
      description: description,
      date: date,
    };
    await addEvent(event);
    setIsLoading(false);

    setTitle('');
    setDescription('');
    setDate('');

    toast({ title: 'Event created successfully', status: 'success' });
  };

  return (
    <Box w="40%" margin={'0 auto'} display="block" mt={5}>
      <Stack direction="column">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Textarea
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button
          onClick={() => handleEventCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          variantScheme="teal"
          variant="solid"
        >
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddEvent;
