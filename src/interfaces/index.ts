import { InputHTMLAttributes } from "react";
import { TodoFormSchema } from "../components/Form/todoFormSchema";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

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
    setEditingTodo: any;
    addTodo: any;
    editTodo: any
}