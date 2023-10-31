import { db } from '../firebase/index';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const addEvent = async ({ userId, title, description, date }) => {
  try {
    await addDoc(collection(db, 'events'), {
      user: userId,
      title: title,
      description: description,
      date: date,
    });
  } catch (err) {}
};

const toggleEventStatus = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, 'events', docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteEvent = async (docId) => {
  try {
    const todoRef = doc(db, 'events', docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};

export { addEvent, toggleEventStatus, deleteEvent };
