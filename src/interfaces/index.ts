import { InputHTMLAttributes } from "react";
import { TodoFormSchema } from "../components/Form/todoFormSchema";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
}

export interface ITodo {
    id: string;
    title: string;
    isDone: boolean;
}

export interface ITodoCardProps {
    todo: ITodo;
}

export interface ITodoProviderProps {
    children: React.ReactNode;
}

export interface ITodoContext {
    todoList: ITodo[];
    backupTodoList: ITodo[];
    addTodo: (formData : TodoFormSchema) => void;
    editTodo: ({ id, formData }: {
        id: string;
        formData: Partial<ITodo>;
    }) => void;
    removeTodo: (id: string) => void;
    toggleAllTodos: () => void;
    allCompleted: boolean;
    leftTodos: number;
    getAllTodos: () => void;
    getActiveTodos: () => void;
    getCompletedTodos: () => void;
    clearCompleted: () => void;
}