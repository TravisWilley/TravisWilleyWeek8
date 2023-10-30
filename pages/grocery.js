import { Container } from '@chakra-ui/react';
import Auth from '../components/Auth';
import TodoList from '../components/TodoList';
import GroceryList from '../components/GroceryList';
export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <GroceryList />
    </Container>
  );
}
//
