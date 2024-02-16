import { db } from "../authentication/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

const addUserToDb = async (db, collectionName, uid, userData) => {
  try {
    const docRef = await setDoc(doc(db, collectionName, uid), userData);
    console.log("successfully added user with uid: ", uid);
  } catch (error) {
    console.error("Error adding user to db", error);
  }
};

const getUserById = async (collectionName, uid) => {
  try {
    const docRef = doc(db, collectionName, uid);
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.exists() ? docSnapshot.data() : null;
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

const updateUser = async (db, collectionName, uid, userData) => {
  try {
    const updateRef = doc(db, collectionName, uid);
    await updateDoc(updateRef, userData);
  } catch (error) {
    console.error("Error updating userInfo to db", error);
  }
};
const addAdmin = async (uid) => {
  const adminData = {
    isAdmin: true,
  };
  try {
    await updateUser(db, "users", uid, adminData);
    console.log("successfullly made admin: ", uid);
  } catch (error) {
    console.error("Error adding user as Admin", error);
  }
};

const removeAdmin = async (uid) => {
  const removeData = {
    isAdmin: false,
  };
  try {
    await updateUser(db, "users", uid, removeData);
    console.log("successfullly made admin: ", uid);
  } catch (error) {
    console.error("Error adding user as Admin", error);
  }
};

const checkAdminStatus = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? (snapshot.data().isAdmin ? true : false) : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getAllUsers = async (db, collectionName) => {
  const documents = await getDocs(collection(db, collectionName)).then(
    (snapshot) => {
      const docs = snapshot.docs;
      const data = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return data;
    }
  );
  return documents;
};

const getAllAdminUsers = async (db, collectionName) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, collectionName), where("isAdmin", "==", true))
    );
    const adminUsers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return adminUsers;
  } catch (error) {
    console.error("Error fetching admin data: ", error);
    return [];
  }
};

export {
  addUserToDb,
  getUserById,
  updateUser,
  getAllUsers,
  getAllAdminUsers,
  addAdmin,
  checkAdminStatus,
  removeAdmin,
};