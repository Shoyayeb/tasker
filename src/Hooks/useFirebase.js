import axios from "axios";
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
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState({});
  const [isLogin, setIsLogin] = useState(true);

  const [taskDetails, setTaskDetails] = useState({});
  const [completedTaskData, setCompletedTaskData] = useState({});
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

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

  useEffect(() => {
    const url = `https://tasker-web0.herokuapp.com/tasks/${user.uid}`;
    axios.get(url).then((data) => {
      setTasks(data.data);
      window.localStorage.setItem('tasks', JSON.stringify(data.data));
      console.log(tasks, '====================================', data.data);
    });
  }, [user.uid]);

  console.log(user);

  const handleTaskSubmit = () => {
    taskDetails.uid = user.uid;
    taskDetails.Done = false;
    taskDetails.Importance = false;
    taskDetails.Time = new Date().toLocaleTimeString();
    taskDetails.Date = new Date().toDateString()
    console.log(taskDetails);
    axios
      .post("https://tasker-web0.herokuapp.com/addtask", taskDetails)
      .then(function (res) {
        const url = `https://tasker-web0.herokuapp.com/tasks/${user.uid}`;
        axios.get(url).then((data) => {
          window.localStorage.setItem('tasks', JSON.stringify(data.data));
          setTasks(JSON.parse(localStorage.getItem('tasks')));
        })
        setTaskDetails({});
        setOpen(false);
      })
      .catch(function (error) {
        console.log(error);
        setOpen(false);
        setTaskDetails({});
      });
  };
  const handleTaskComplete = (id) => {
    axios.get(`https://tasker-web0.herokuapp.com/task/${id}`).then((data) => {
      setCompletedTaskData(data.data);
      completedTaskData.Done = true;
      console.log(data);
      handleRemoveTask(id);
      axios
        .post("https://tasker-web0.herokuapp.com/addcompletedtask", completedTaskData)
        .then(function (res) {
          const url = `https://tasker-web0.herokuapp.com/tasks/${user.uid}`;
          axios.get(url).then((data) => {
            window.localStorage.setItem('tasks', JSON.stringify(data.data));
            setTasks(JSON.parse(localStorage.getItem('tasks')));
          })
          setCompletedTaskData({});
        })
        .catch(function (error) {
          console.log(error);
          setCompletedTaskData({});
        });
    });
  };
  const handleRemoveTask = (id) => {
    const url = `https://tasker-web0.herokuapp.com/tasks/${id}`;
    axios.delete(url)
      .then((data) => {
        console.log(data);
        if (data.data.deletedCount > 0) {
          const remaining = tasks.filter((restTask) => restTask._id !== id);
          setTasks(remaining);
          window.localStorage.setItem('tasks', JSON.stringify(remaining));
        }
      });
  }
  return {
    open, setOpen,
    error, setError,
    loading, setIsLoading,
    isLogin, setIsLogin,
    modal, setModal,
    admin, setAdmin,
    tasks, setTasks,
    taskDetails, setTaskDetails,
    completedTaskData, setCompletedTaskData,
    user,
    loginUserByEmail,
    createUserByEmail,
    socialSignIn,
    signOutUser,
    handleRemoveTask,
    handleTaskComplete,
    handleTaskSubmit,
  };
};

export default useFirebase;
