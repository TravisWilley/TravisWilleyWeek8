import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useAuth from '../../Assignment10/hooks/useAuth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../Assignment10/firebase';
import { FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { deleteGrocery, toggleGroceryStatus } from '../api/grocery';
const GroceryList = () => {
  const [grocery, setGrocery] = React.useState([]);

  const { user } = useAuth();
  const toast = useToast();
  const refreshData = () => {
    if (!user) {
      setList([]);
      return;
    }
    const q = query(collection(db, 'grocery'), where('user', '==', user.uid));

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setGrocery(ar);
    });
  };

  useEffect(() => {
    if (!user) {
      setGrocery([]);
      return;
    }
    const q = query(collection(db, 'grocery'), where('user', '==', user.uid));

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setGrocery(ar);
    });
  }, [user]);

  const handleGroceryDelete = async (id) => {
    if (confirm('Are you sure you wanna delete this item?')) {
      deleteGrocery(id);
      toast({ title: 'Grocery List updated successfully', status: 'success' });
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status == 'completed' ? 'pending' : 'completed';
    await toggleGroceryStatus({ docId: id, status: newStatus });
    toast({
      title: `List marked ${newStatus}`,
      status: newStatus == 'completed' ? 'success' : 'warning',
    });
  };

  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {grocery &&
          grocery.map((grocery) => (
            <Box
              key={grocery.id}
              p={3}
              boxShadow="2xl"
              shadow={'dark-lg'}
              transition="0.2s"
              _hover={{ boxShadow: 'sm' }}
            >
              <Heading as="h3" fontSize={'xl'}>
                {grocery.title}{' '}
                <Badge
                  color="red.500"
                  bg="inherit"
                  transition={'0.2s'}
                  _hover={{
                    bg: 'inherit',
                    transform: 'scale(1.2)',
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleGroceryDelete(grocery.id)}
                >
                  <FaTrash />
                </Badge>
                <Badge
                  color={grocery.status == 'pending' ? 'gray.500' : 'green.500'}
                  bg="inherit"
                  transition={'0.2s'}
                  _hover={{
                    bg: 'inherit',
                    transform: 'scale(1.2)',
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleToggle(grocery.id, grocery.status)}
                >
                  {grocery.status == 'pending' ? (
                    <FaToggleOff />
                  ) : (
                    <FaToggleOn />
                  )}
                </Badge>
                <Badge
                  float="right"
                  opacity="0.8"
                  bg={grocery.status == 'pending' ? 'yellow.500' : 'green.500'}
                >
                  {grocery.status}
                </Badge>
              </Heading>
              <Text>{grocery.description}</Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default GroceryList;
