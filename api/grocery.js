import { db } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const addItem = async ({ userId, title, description, status }) => {
  try {
    await addDoc(collection(db, 'grocery'), {
      user: userId,
      amount: amount,
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

const toggleCollected = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, 'grocery', docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteItem = async (docId) => {
  try {
    const todoRef = doc(db, 'grocery', docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};

export { addItem, toggleCollected, deleteItem };
