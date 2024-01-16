import React from "react";
export const View = ({ notes , deleteNote}) => {
  return notes.map(note => (
    <div key={note.number}>
      <h1>{note.number}</h1>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <button className="deletebtn" onClick={() => deleteNote(note.number)}>
        DEL
      </button>
    </div>
  ));
  // <div>
  //     <h1></h1>
  //     <p></p>
  //     <button></button>
  // </div>
};
