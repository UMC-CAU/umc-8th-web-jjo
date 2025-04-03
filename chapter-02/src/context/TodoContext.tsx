import { Children, createContext } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext{
    todos: TTodo[];
    dontodos: TTodo[];
    addTOdo: (todo: TTodo) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

const TodoContext = createContext | undefined>(undefined);

export const TodoProvider = {Children}:
PropsWithChildren<ITodoContext></ITodoContext>