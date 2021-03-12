import React, { useState } from 'react';

function Habit(props){
  const [checkHabit, setCheckHabit] = useState(props.check);
  var query = props.db.collection("habits").where("user", "==", props.uid);
  //console.log(checkHabit);

  const updateHabit = () => {
    setCheckHabit(!checkHabit);
    var docID;
    query.get().then((e) => {
      docID = e.docs[props.index].id;
      props.db.collection("habits").doc(docID).update({ check: checkHabit });
      console.log(checkHabit);
    });
  };

  var time = new Date();
  if(time.getHours() === 0 && time.getMinutes() === 1 && time.getSeconds() === 0){
    setCheckHabit(true);
    updateHabit();
    console.log(time.getHours);
  }

  return (
    <div>
      {props.label} {props.text}
      <input
        type="checkbox"
        checked={props.check}
        onChange={() => updateHabit()}
      />
    </div>
  );
}
export default Habit;