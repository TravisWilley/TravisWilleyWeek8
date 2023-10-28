import { Container } from '@chakra-ui/react';
import Auth from '../components/Auth';
import AddItem from '../components/AddGroceryItem';
export default function AddGroceryItem() {
  return (
    <Container maxW="7xl">
      <Auth />
      <AddItem />
    </Container>
  );
}
//
