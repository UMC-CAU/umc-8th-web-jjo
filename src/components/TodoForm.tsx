  {
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
