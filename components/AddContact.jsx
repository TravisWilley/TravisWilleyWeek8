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
import { addContact } from '../../Assignment10/api/contacts';
const AddContact = () => {
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const { isLoggedIn, user } = useAuth();

  const handleContactCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: 'You must be logged in to add a contact',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const event = {
      userId: user.uid,
      name: name,
      number: number,
      email: email,
    };
    await addContact(event);
    setIsLoading(false);

    setName('');
    setNumber('');
    setEmail('');

    toast({ title: 'Contact added successfully', status: 'success' });
  };

  return (
    <Box w="40%" margin={'0 auto'} display="block" mt={5}>
      <Stack direction="column">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Textarea
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <Textarea
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          onClick={() => handleContactCreate()}
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

export default AddContact;
