import { Container } from '@chakra-ui/react';
import Auth from '../components/Auth';
import TodoList from '../components/TodoList';
import GroceryList from '../components/GroceryList';
import ContactList from '../components/ContactList';
import EventList from '../components/EventList';
export default function Home() {
  return (
    <Container maxW="7xl">
      <Auth />
      <TodoList />
      <GroceryList />
      <ContactList />
      <EventList />
    </Container>
  );
}
//
