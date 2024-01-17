import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
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
  // const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setloading] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const apiUrl = "https://note-taking-backend-server.vercel.app/api/task";

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${apiUrl}/all`, {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      });

      const data = await response.json();

      if (response.ok) {
        setNotes(data.todos);
      } else {
        alert(data.error || "Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
        body: JSON.stringify({ title, task: content }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotes(data.user.todos);
        // setNumber("");
        setTitle("");
        setContent("");
      } else {
        alert(data.error || "Failed to add todo");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const openUpdatePopup = (todo) => {
    setSelectedTodo(todo);
    setIsUpdatePopupOpen(true);
  };

  const closeUpdatePopup = () => {
    setSelectedTodo(null);
    setIsUpdatePopupOpen(false);
  };

  const updateNote = async (todoId, updatedData) => {
    try {
      const response = await fetch(`${apiUrl}/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        setNotes(data.user.todos);
        closeUpdatePopup();
      } else {
        alert(data.error || "Failed to update todo");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const deleteNote = async (todoId) => {
    try {
      const response = await fetch(`${apiUrl}/${todoId}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      });

      const data = await response.json();

      if (response.ok) {
        setNotes(data.user.todos);
      } else {
        alert(data.error || "Failed to delete todo");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const logout = () => {
    localStorage.removeItem('x-auth-token');
    window.location.href="/";
  }

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      if(localStorage.getItem("x-auth-token") != null){
        setloading(false);
      }else{
        window.location.href="/";
      }
    }, 3000);

    fetchTodos();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <center style={{ marginTop: "300px" }}>
          <PacmanLoader
            color="#f5ba13"
            loading={loading}
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
              <button className="add_button" onClick={addItem}>
                Add
              </button>
            </form>
          </div>
          {isUpdatePopupOpen && (
            <div className="center-div">
            <div className="update-popup">
              <h2>Update Todo</h2>
              <label>Title</label>
              <input
                type="text"
                value={selectedTodo.title}
                onChange={(e) =>
                  setSelectedTodo({ ...selectedTodo, title: e.target.value })
                }
              />
              <label>Task</label>
              <input
                type="text"
                value={selectedTodo.task}
                onChange={(e) =>
                  setSelectedTodo({ ...selectedTodo, task: e.target.value })
                }
              />
              <div className="btn-container">
                <button
                  onClick={() => updateNote(selectedTodo._id, selectedTodo)}
                >
                  Save
                </button>
                <button onClick={closeUpdatePopup}>Cancel</button>
              </div>
            </div></div>
          )}

          <div className="noteShow">
            <div className="removeAll" onClick={() => setNotes([])}>
              Remove All
            </div>
            <div className="noteDisplay">
              {notes.map((note) => (
                <div key={note._id} className="note">
                  <h1 className="title">{note.title}</h1>
                  <i className="task">{note.task}</i>
                  <span className="btn-container">
                    <button
                      className="deletebtn"
                      onClick={() => deleteNote(note._id)}
                    >
                      DELETE
                    </button>
                    <button
                      className="updatebtn"
                      onClick={() => openUpdatePopup(note)}
                    >
                      UPDATE
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button className="logoutbtn" onClick={logout}>logout</button>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}

export default Apps;
