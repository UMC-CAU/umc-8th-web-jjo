import * as React from 'react';
import { useState, FormEvent } from 'react';
import { TTodo } from '../types/todo';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Todo = (): JSX.Element => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [donetodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
      setInput("");
    }
  };

  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos) =>
      prevTodos.filter((t): boolean => t.id !== todo.id)
    );
    setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prevDoneTodo): TTodo[] =>
      prevDoneTodo.filter((t): boolean => t.id !== todo.id)
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container_header">JJO TODO</h1>
      <TodoForm
      />
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
        />
        <TodoList
          title="완료"
          todos={donetodos}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
