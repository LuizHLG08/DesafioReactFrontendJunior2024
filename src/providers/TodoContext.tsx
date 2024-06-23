import { createContext, useState, useEffect } from "react";
import { ITodoContext, ITodoProviderProps, ITodo } from "../interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { TodoFormSchema } from "../components/Form/todoFormSchema";

export const TodoContext = createContext({} as ITodoContext);

export const TodoProvider = ({ children }: ITodoProviderProps) => {
    const [todoList, setTodoList] = useState<ITodo[]>([]);
    const [backupTodoList, setBackupTodoList] = useState<ITodo[]>([])
    const [allCompleted, setAllCompleted] = useState<boolean>(false)
    const [leftTodos, setLeftTodos] = useState<number>(0)

    useEffect(() => {
        const getTodoList = async () => {
            try {
                const { data } = await api.get("/todos")
                setTodoList(data)
                setBackupTodoList(data)
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

    useEffect(() => {
        const countLeftTodos = () => {
            const count = todoList.filter(todo => todo.isDone === false)
            setLeftTodos(count.length)
        }
        countLeftTodos()
    },[todoList])

    const generateId = (length: number) => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return [...crypto.getRandomValues(new Uint8Array(length))]
            .map(x => caracteres[x % caracteres.length])
            .join('');
    }

    const addTodo = (formData: TodoFormSchema) => {
        if(formData.title) {
            const newTodo = {
                id: generateId(5),
                isDone: false,
                ...formData
            }
            setTodoList([...todoList, newTodo] )
            setBackupTodoList([...todoList, newTodo])
        }
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
        setBackupTodoList(newList)
    }

    const removeTodo = (id : string) => {
        const newList = todoList.filter(todo => todo.id !== id)
        setTodoList(newList)
        setBackupTodoList(newList)
    }

    const allTodosFinished = () => {
        const newList = todoList.map(todo => ({
            ...todo,
            isDone: true   
        }));
        setTodoList(newList);
        setBackupTodoList(newList)
        setAllCompleted(true);
    }

    const resetAllTodos = () => {
        const newList = todoList.map(todo => ({
            ...todo,
            isDone: false
        }));
        setTodoList(newList);
        setBackupTodoList(newList)
        setAllCompleted(false); 
    }

    const toggleAllTodos = () => {
        if (allCompleted) {
            resetAllTodos();
        } else {
            allTodosFinished();
        }
    }

    const getAllTodos = () => {
        setTodoList(backupTodoList)
    }

    const getActiveTodos = () => {
        const list = backupTodoList.filter(todo => todo.isDone === false)
        setTodoList(list)
    }

    const getCompletedTodos = () => {
        const list = backupTodoList.filter(todo => todo.isDone === true)
        setTodoList(list)
    }

    const clearCompleted = () => {
        const list = backupTodoList.filter(todo => todo.isDone === false)
        setTodoList(list)
        setBackupTodoList(list)
    }

    return (
        <TodoContext.Provider value={{ todoList, addTodo, editTodo, removeTodo, toggleAllTodos, allCompleted, leftTodos, getAllTodos, getActiveTodos, getCompletedTodos, clearCompleted, backupTodoList }}>
            {children}
        </TodoContext.Provider>
    );
};