import React from 'react';
import firebase from 'firebase/app';

import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';


function HabitList(props) {
    console.log(props.user);
    return (
      <div>
        <form>
          <input
          // className=""
          // type="text"
          // onChange=""
          />

          <button>Add a new habit.</button>
        </form>

        <div>
        Here are all your habits:
        </div>
      </div>
    );
}

export default HabitList;