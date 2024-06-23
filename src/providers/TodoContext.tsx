import { createContext, useState, useEffect } from "react";
import { ITodoContext, ITodoProviderProps, ITodo } from "../interfaces";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { TodoFormSchema } from "../components/Form/todoFormSchema";

export const TodoContext = createContext({} as ITodoContext);

export const TodoProvider = ({ children }: ITodoProviderProps) => {
    const [todoList, setTodoList] = useState<ITodo[]>([]);
    const [backupTodoList, setBackupTodoList] = useState<ITodo[]>([]);
    const [allCompleted, setAllCompleted] = useState<boolean>(false);
    const [leftTodos, setLeftTodos] = useState<number>(0);

    useEffect(() => {
        const getTodoList = async () : Promise<void> => {
            try {
                const { data } = await api.get("/todos");
                setTodoList(data);
                setBackupTodoList(data);
            } catch (error) {
                const currentError = error as AxiosError;
                console.error(currentError);
            }
        }
        getTodoList();
    }, []);

    useEffect(() => {
        const verifyTodos = () : void => {
            const verify : boolean = todoList.every(todo => todo.isDone === true)
            if(verify) {
                setAllCompleted(true);
            } else {
                setAllCompleted(false);
            }
        }
        verifyTodos();
    },[todoList]);

    useEffect(() => {
        const countLeftTodos = () : void => {
            const count : number = todoList.filter(todo => todo.isDone === false).length;
            setLeftTodos(count);
        }
        countLeftTodos();
    },[todoList]);

    const generateId = (length: number) : string => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return [...crypto.getRandomValues(new Uint8Array(length))]
            .map(x => caracteres[x % caracteres.length])
            .join('');
    }

    const addTodo = (formData: TodoFormSchema) : void => {
        if(formData.title) {
            const newTodo = {
                id: generateId(5),
                isDone: false,
                ...formData
            }
            setTodoList([...todoList, newTodo] );
            setBackupTodoList([...todoList, newTodo]);
        }
    }

    const editTodo = ({ id, formData }: { id: string, formData: Partial<ITodo> }) : void => {
        const newList : ITodo[] = todoList.map(todo => {
            if (todo.id === id) {
                const newTodo = {
                    ...todo,
                    ...formData
                }
                return newTodo;
            }
            return todo;
        });
        setTodoList(newList);
        setBackupTodoList(newList);
    }

    const removeTodo = (id : string) : void => {
        const newList : ITodo[] = todoList.filter(todo => todo.id !== id);
        setTodoList(newList);
        setBackupTodoList(newList);
    }

    const allTodosFinished = () : void => {
        const newList : ITodo[] = todoList.map(todo => ({
            ...todo,
            isDone: true   
        }));
        setTodoList(newList);
        setBackupTodoList(newList);
        setAllCompleted(true);
    }

    const resetAllTodos = () : void => {
        const newList : ITodo[] = todoList.map(todo => ({
            ...todo,
            isDone: false
        }));
        setTodoList(newList);
        setBackupTodoList(newList);
        setAllCompleted(false); 
    }

    const toggleAllTodos = () : void => {
        if (allCompleted) {
            resetAllTodos();
        } else {
            allTodosFinished();
        }
    }

    const getAllTodos = () : void => {
        setTodoList(backupTodoList);
    }

    const getActiveTodos = () : void => {
        const list  : ITodo[] = backupTodoList.filter(todo => todo.isDone === false)
        setTodoList(list);
    }

    const getCompletedTodos = () : void => {
        const list  : ITodo[] = backupTodoList.filter(todo => todo.isDone === true)
        setTodoList(list);
    }

    const clearCompleted = () : void => {
        const list : ITodo[] = backupTodoList.filter(todo => todo.isDone === false)
        setTodoList(list);
        setBackupTodoList(list);
    }

    return (
        <TodoContext.Provider value={{ todoList, addTodo, editTodo, removeTodo, toggleAllTodos, allCompleted, leftTodos, getAllTodos, getActiveTodos, getCompletedTodos, clearCompleted, backupTodoList }}>
            {children}
        </TodoContext.Provider>
    );
};