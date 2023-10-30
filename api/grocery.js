import { db } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const addItem = async ({ title, description, amount, status, userId }) => {
  try {
    await addDoc(collection(db, 'grocery'), {
      user: userId,
      title: title,
      amount: amount,
    });
  } catch (err) {
    console.log(err);
  }
};

const toggleGroceryStatus = async ({ docId, status }) => {
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

export { addItem, toggleGroceryStatus, deleteItem };
