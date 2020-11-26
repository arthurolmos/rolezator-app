import React from "react";
import firebase from "firebase";
import dao from "../dao";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const db = firebase.firestore();
  const auth = firebase.auth();
  auth.useDeviceLanguage();

  const [user, setUser] = React.useState(null);
  const [userSuggestions, setUserSuggestions] = React.useState([]);
  const [userBlacklist, setUserBlacklist] = React.useState([]);

  React.useEffect(() => {
    function addListener(uid, collection, setter) {
      return db
        .collection("users")
        .doc(uid)
        .collection(collection)
        .onSnapshot((collection) => {
          const docs = [];

          collection.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            docs.push(data);
          });

          setter(docs);
        });
    }

    const unsubscribe = auth.onAuthStateChanged(function (user) {
      let blacklistUnsubscribe = null;
      let suggestionsUnsubscribe = null;

      if (user) {
        setUser(user);

        const uid = user.uid;

        blacklistUnsubscribe = addListener(uid, "blacklist", setUserBlacklist);
        suggestionsUnsubscribe = addListener(
          uid,
          "suggestions",
          setUserSuggestions
        );
      } else {
        setUser(null);

        blacklistUnsubscribe && blacklistUnsubscribe();
        suggestionsUnsubscribe && suggestionsUnsubscribe();
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  async function addToUserSuggestions(item) {
    try {
      const ref = dao.getBaseRef();

      const suggestionsRef = ref.collection("suggestions");
      await dao.createDocument(suggestionsRef, item);
    } catch (error) {
      console.log("Error inserting suggestion", error);
    }
  }

  async function removeFromUserSuggestions(id) {
    try {
      const ref = dao.getBaseRef();

      const suggestionsRef = ref.collection("suggestions").doc(id);
      await dao.deleteDocument(suggestionsRef);
    } catch (error) {
      console.log("Error removing doc", error);
    }
  }

  async function addToUserBlacklist(item) {
    try {
      const ref = dao.getBaseRef();

      const blacklistRef = ref.collection("blacklist");
      await dao.createDocument(blacklistRef, item);
    } catch (error) {
      console.log("Error inserting blacklist", error);
    }
  }

  async function removeFromUserBlacklist(id) {
    try {
      const ref = dao.getBaseRef();

      const blacklistRef = ref.collection("blacklist").doc(id);
      await dao.deleteDocument(blacklistRef);
    } catch (error) {
      console.log("Error inserting doc", error);
    }
  }

  async function signIn() {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();

      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.log("ERROR ON SIGNIN", error);
    }
  }

  function signOut() {
    auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,

        userSuggestions,
        addToUserSuggestions,
        removeFromUserSuggestions,

        userBlacklist,
        addToUserBlacklist,
        removeFromUserBlacklist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
