import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { db } from "./firebase";
import "./TodoList.css";
import EditIcon from "@material-ui/icons/Edit";
import { Modal } from "@material-ui/core";
import { useState } from "react";

export default function TodoList({ Icon, text, id }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const removeTodo = () => {
    db.collection("todo").doc(id).delete();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(input);

  const editTodo = () => {
    db.collection("todo").doc(id).set(
      {
        name: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal className="modal" open={open} onClose={handleClose}>
        <div className="modal-body">
          <div className="modal-title">
            <h1>Edit Todo List</h1>
          </div>
          <div className="modal-input">
            <input
              type="text"
              placeholder={text}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={editTodo} className="update">
              Update todo
            </button>
            <ClearIcon onClick={(e) => setOpen(false)}></ClearIcon>
          </div>
        </div>
      </Modal>
      <div className="todo-list">
        <ul>
          <li id={id}>
            {Icon}
            {text}
            <EditIcon
              className="edit"
              onClick={(e) => setOpen(true)}
            ></EditIcon>
            <ClearIcon className="clear" onClick={removeTodo}></ClearIcon>
          </li>
        </ul>
      </div>
    </>
  );
}
