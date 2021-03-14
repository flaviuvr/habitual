import React, { useState } from 'react';

function Habit(props){
  const [checkHabit, setCheckHabit] = useState(props.check);
  var query = props.db.collection("habits").where("user", "==", props.uid);
  //console.log(checkHabit);

  const updateHabit = () => {
    setCheckHabit(!checkHabit);
    if (checkHabit){
      var docID;
      query.get().then((e) => {
        docID = e.docs[props.index].id;
        props.db.collection("habits").doc(docID).update({ check: checkHabit });
        console.log(checkHabit);
      });
    }
  };

  return (
    <div>
      <div>
        {props.label} {props.text}

        <input
          type="checkbox"
          checked={props.check}
          onChange={() => updateHabit()}
        />
      </div>
    </div>
  );
}
export default Habit;