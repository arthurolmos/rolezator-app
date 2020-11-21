import React from "react";
import firebase from "firebase";
import dao from "../dao";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const db = firebase.firestore();
  const auth = firebase.auth();

  const [user, setUser] = React.useState(null);
  const [suggestions, setSuggestions] = React.useState([]);
  const [blacklist, setBlacklist] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      let blacklistUnsubscribe;
      let suggestionsUnsubscribe;

      if (user) {
        setUser(user);

        const uid = user.uid;

        blacklistUnsubscribe = addListener(uid, "blacklist", setBlacklist);
        suggestionsUnsubscribe = addListener(
          uid,
          "suggestions",
          setSuggestions
        );
      } else {
        setUser(null);

        blacklistUnsubscribe();
        suggestionsUnsubscribe();
      }
    });

    return () => unsubscribe();
  }, []);

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

  async function addSuggestion(item) {
    try {
      const ref = dao.getBaseRef();

      const suggestionsRef = ref.collection("suggestions");
      await dao.createDocument(suggestionsRef, item);
    } catch (error) {
      console.log("Error inserting suggestion", error);
    }
  }

  async function addToBlacklist(item) {
    try {
      const ref = dao.getBaseRef();

      const blacklistRef = ref.collection("blacklist");
      await dao.createDocument(blacklistRef, item);
    } catch (error) {
      console.log("Error inserting blacklist", error);
    }
  }

  async function removeFromBlacklist(id) {
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
      auth.useDeviceLanguage();
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

        suggestions,
        addSuggestion,

        blacklist,
        addToBlacklist,
        removeFromBlacklist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
