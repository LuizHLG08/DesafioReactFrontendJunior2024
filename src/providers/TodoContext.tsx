import { createContext, useState, useEffect } from "react";
import { ITodoContext, ITodoProviderProps, ITodo } from "../interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { TodoFormSchema } from "../components/Form/todoFormSchema";

export const TodoContext = createContext({} as ITodoContext);

export const TodoProvider = ({ children }: ITodoProviderProps) => {
    const [todoList, setTodoList] = useState<ITodo[]>([]);
    const [allCompleted, setAllCompleted] = useState(false)

    useEffect(() => {
        const getTodoList = async () => {
            try {
                const { data } = await api.get("/todos")
                setTodoList(data)
            } catch (error) {
                const currentError = error as AxiosError
                console.error(currentError)
            }
        }
        getTodoList()
    }, [])

    useEffect(() => {
        const verifyTodos = () => {
            const verify = todoList.every(todo => todo.isDone === true)
            if(verify) {
                setAllCompleted(true)
            } else {
                setAllCompleted(false)
            }
        }
        verifyTodos()
    },[todoList])

    const generateId = (length: number) => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return [...crypto.getRandomValues(new Uint8Array(length))]
            .map(x => caracteres[x % caracteres.length])
            .join('');
    }

    const addTodo = (formData: TodoFormSchema) => {
        const newTodo = {
            id: generateId(5),
            isDone: false,
            ...formData
        }
        setTodoList([...todoList, newTodo] )
    }

    const editTodo = ({ id, formData }: { id: string, formData: Partial<ITodo> }) => {
        const newList = todoList.map(todo => {
            if (todo.id === id) {
                const newTodo = {
                    ...todo,
                    ...formData
                }
                return newTodo
            }
            return todo
        })
        setTodoList(newList)
    }

    const removeTodo = (id : string) => {
        const newList = todoList.filter(todo => todo.id !== id)
        setTodoList(newList)
    }

    const allTodosFinished = () => {
        const newList = todoList.map(todo => ({
            ...todo,
            isDone: true   
        }));
        setTodoList(newList);
        setAllCompleted(true);
    }

    const resetAllTodos = () => {
        const newList = todoList.map(todo => ({
            ...todo,
            isDone: false
        }));
        setTodoList(newList);
        setAllCompleted(false); 
    }

    const toggleAllTodos = () => {
        if (allCompleted) {
            resetAllTodos();
        } else {
            allTodosFinished();
        }
    }

    return (
        <TodoContext.Provider value={{ todoList, addTodo, editTodo, removeTodo, toggleAllTodos, allCompleted }}>
            {children}
        </TodoContext.Provider>
    );
};