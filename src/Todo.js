import React from "react";
import "./Todo.css";
import { useState, useEffect } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import TodoList from "./TodoList";
import { db } from "./firebase";
import firebase from "firebase";

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setTodo(
          snapshot.docs.map((item) => ({
            id: item.id,
            data: item.data(),
          }))
        )
      );
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todo").add({
      name: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="todo">
      <div className="todo-body">
        <h2>Todo app</h2>
        <form>
          <input
            type="text"
            placeholder="Add todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="btn-todo"
            type="submit"
            onClick={addTodo}
            disabled={!input}
          >
            Add
          </button>
        </form>
        <div className="list">
          {todo.map(({ id, data: { name } }) => (
            <TodoList
              Icon={<ThumbUpAltIcon className="thumb"></ThumbUpAltIcon>}
              key={id}
              id={id}
              text={name}
            ></TodoList>
          ))}
        </div>
      </div>
    </div>
  );
}
