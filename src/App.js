import React, { useRef, useState } from 'react';
import './App.css';

//import HabitList from './components/HabitList.js';
import SignIn from './components/SignIn.js';
import SignOut from './components/SignOut.js';
import HabitList from './components/HabitList.js';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//initializes the registered app from firebase with the given config
firebase.initializeApp({
  apiKey: "AIzaSyCdtLr53pjpSvOwOfoskZRh6Yr7Y5sNU70",
  authDomain: "habitual-b4c8e.firebaseapp.com",
  projectId: "habitual-b4c8e",
  storageBucket: "habitual-b4c8e.appspot.com",
  messagingSenderId: "433764087571",
  appId: "1:433764087571:web:8e8da2de2ea975ef760ce6"
})

const auth = firebase.auth();
const db = firebase.firestore();

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
} 

function App() {
  const [user] = useAuthState(auth);
  console.log(user);
  const habitsRef = db.collection('habits');

  return (
    <div className="App">
      <header className="App-header">
        Habitual
        <SignOut user={auth.currentUser} action={() => auth.signOut()} />
      </header>

      <section>
        {user ? (
          <div>
          Hello, {auth.currentUser.displayName}
          <HabitList user={auth.currentUser} habits={habitsRef}/>
          </div>
        ) : (
          <SignIn action={() => signInWithGoogle()} />
        )}
      </section>
    </div>
  );
}

// function HabitList() {
//   const habitsRef = firestore.collection('habits');

//   return (
//       <div>
//       <form>
//           <input 
//               className=""
//               type="text"
//           />
//       <button>Add a new habit.</button>
//       </form>

//       <div>
//           Here are all of your habits:
//       </div>
//       </div>
//   );
// }


export default App;
