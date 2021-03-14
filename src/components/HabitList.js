import React, { useState } from 'react';
import Habit from './Habit.js';

import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';


function HabitList(props) {
  const [label, setLabel] = useState("");
  const [text, setText] = useState("");

  //query used to display the habits in a list
  const query = props.db.collection("habits").where("user", "==", props.uid);
  const [habits] = useCollectionData(query);
  //console.log(habits);

  //Adding a new user to the database
  const addUser = (user, userID) => {
    const userFirstName = user.displayName.split(" ")[0];
    const userLastName = user.displayName.split(" ")[1];
    const userMail = user.email;

    const data = {
      firstName: userFirstName,
      lastName: userLastName,
      email: userMail,
    };

    props.db.collection("users").doc(userID).set(data);
  };
  addUser(props.user, props.uid);

  //Adding a new habit to the database
  const updateLabel = (e) => {
    setLabel(e.target.value);
  };

  const updateText = (e) => {
    setText(e.target.value);
  };

  const addHabit = (userID, newLabel, newText) => {
    const data = {
      check: false,
      label: newLabel,
      text: newText,
      user: userID,
    };

    props.db.collection("habits").add(data);

    setText("");
    setLabel("");
  };

  const removeHabit = (index) => {
    var docID;
    query.get().then((e) => {
      docID = e.docs[index].id;
      props.db.collection("habits").doc(docID).delete();
      console.log("Deleted habit with doc ID: ", docID);
    });
  };

  const resetHabits = () => {
    habits.forEach((habit) => {
      const resetQuery = props.db.collection("habits").where("text", "==", habit.text)
      var docID;

      resetQuery.get().then((e) => {
        console.log(e);
        docID = e.docs[0].id;
        console.log(docID);
        props.db.collection("habits").doc(docID).update({ check: false });
      });
      console.log(habit.text);
    })
  }

  return (
    <div>
      <div className="habits">
        {habits &&
          habits.map((habit) => (
            <div>
              <Habit
                key={habit.id}
                label={habit.label}
                text={habit.text}
                check={habit.check}
                db={props.db}
                uid={props.uid}
                index={habits.indexOf(habit)}
              />
              <button onClick={() => removeHabit(habits.indexOf(habit))}>
                Remove
              </button>
            </div>
          ))}
      </div>

      <form>
        <input className="border border-green-500 pd" type="text" value={label} onChange={updateLabel} />
        <input className="border border-green-500" type="text" value={text} onChange={updateText} />
        <button type="button" onClick={() => addHabit(props.uid, label, text)}>
          Add a new habit
        </button>
      </form>
      <button type="button" onClick={() => resetHabits()}>Reset all habits</button>
    </div>
  );
}

export default HabitList;