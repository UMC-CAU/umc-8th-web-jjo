import React, { useState } from "react";

interface TodoFormProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TodoForm = ({ input, setInput, handleSubmit }: 
    TodoFormProps): JSX.Element => {
        const [input, setInput] useState<string>("");

        const handleSubmit = (e: FormEvent<HTMLFormElement>)
        : void => {
            e.preventDefault();
            const text = input.trim();

            if(text) {
                const newTodo: TTodo = { id: Date.now(), text };
                setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
                setInput("");           

            }
        };  

    
    return (
    <div>
      <form onSubmit={handleSubmit} className="todo-container_form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="todo-container_input"
          placeholder="할 일 입력"
          required
        />
        <button type="submit" className="todo-container_button">
          할 일 추가
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
