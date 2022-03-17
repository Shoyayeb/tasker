import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from "../Firebase/firebase.init";
initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState({});
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth();
  auth.useDeviceLanguage();

  // create user with email
  const createUserByEmail = (email, password, firstName, lastName) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        const uid = userCredential.user.uid;
        const name = firstName + " " + lastName;
        const photoURL = "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
        const newUser = { email, displayName: name, photoURL, uid };
        setUser(newUser);

        setError("");
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
        });
      })
      .catch((error) => {
        setError(error.message);
        setModal(true);
      })
      .finally(() => setIsLoading(false));
  };
  // login user with email and password
  const loginUserByEmail = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        setModal(true);
      })
      .finally(() => setIsLoading(false));
  };

  // login or create user with gmail twitter and github
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // google sign in
  const socialSignIn = (socialProvider) => {
    setIsLoading(true);
    if (socialProvider === "google") {
      return signInWithPopup(auth, googleProvider)
        .then((result) => {
          setError("");
        })
        .catch((error) => {
          setError(error.message);
          setModal(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (socialProvider === "github") {
      return signInWithPopup(auth, githubProvider)
        .then((result) => {
          setError("");
        })
        .catch((error) => {
          setError(error.message);
          setModal(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // sign out
  const signOutUser = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setError("");
        console.log("Sign out success");
      })
      .catch((error) => {
        setError(error.message);
        setModal(true);
      })
      .finally(() => setIsLoading(false));
  };

  // managing user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser({});
        console.log(user);
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, [auth]);

  return {
    user,
    error,
    setError,
    loading,
    setIsLoading,
    isLogin,
    setIsLogin,
    modal,
    admin,
    setAdmin,
    setModal,
    loginUserByEmail, createUserByEmail,
    socialSignIn,
    signOutUser,
  };
};

export default useFirebase;
