import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { View } from "./View";
import PacmanLoader from "react-spinners/PacmanLoader";
const getDataFromLS = () => {
  const data = localStorage.getItem("notes");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
function Apps() {
  const [notes, setNotes] = useState(getDataFromLS);
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    let note = {
      number,
      title,
      content,
    };
    setNotes([...notes, note]);
    setNumber("");
    setTitle("");
    setContent("");
  };

  const deleteNote = (number) => {
    const filteredNotes = notes.filter((element, index) => {
      return element.number !== number;
    });
    setNotes(filteredNotes);
  };
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <center style={{"margin-top": "300px"}}>
          <PacmanLoader
            color="#f5ba13"
            loading={loading}
            //cssOverride={override}
            size={40}
            aria-label="PacmanLoader Spinner"
            data-testid="loader"
          />
        </center>
      ) : (
        <div className="all">
          <Header />
          <div className="main">
            <form>
              <label>Serial Number</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Serial Number"
              ></input>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              ></input>
              <label>Content</label>
              <input
                name="content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder="Take a note..."
                rows="3"
              ></input>
              <button className="add_button" onClick={addItem}>Add</button>
            </form>
          </div>

          <div className="noteShow">
              <div className="removeAll" onClick={() => setNotes([])}>
                Remove All
              </div>
              <div className="noteDisplay">
                {notes.length > 0 && (
                  <View notes={notes} deleteNote={deleteNote}></View>
                )}
                {notes.length < 1 && <div> No notes are added yet </div>}
              </div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}
export default Apps;
