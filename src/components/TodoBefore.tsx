import React, { FormEvent, useState } from "react";
import { TTodo } from "../types/todo";
import TodoForm from "./TodoForm";

const TodoBefore = (): JSX.Element => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [donetodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      setTodos((prev) => [...prev, newTodo]);
      setInput("");
    }
  };

  const completeTodo = (todo: TTodo): void => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => [...prev, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container_header">JJO TODO</h1>
      <TodoForm input={input} setInput={setInput} handleSubmit={handleSubmit} />
      
    </div>
  );
};

export default TodoBefore;
