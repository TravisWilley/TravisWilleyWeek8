import { db } from '../../Assignment10/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const addContact = async ({ userId, name, number, email }) => {
  try {
    await addDoc(collection(db, 'contacts'), {
      user: userId,
      name: name,
      number: number,
      email: email,
    });
  } catch (err) {}
};

const toggleContactStatus = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, 'contacts', docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteContact = async (docId) => {
  try {
    const todoRef = doc(db, 'contacts', docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};

export { addContact, toggleContactStatus, deleteContact };
