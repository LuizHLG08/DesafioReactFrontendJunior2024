import { createContext, useState } from "react";
import { ITodoContext, ITodoProviderProps } from "../interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export const TodoContext = createContext({} as ITodoContext);

export const TodoProvider = ({children} : ITodoProviderProps) => {

    const [editingTodo, setEditingTodo] = useState(null)
    const queryClient = useQueryClient()

    const revalidate = () => {
        queryClient.invalidateQueries({queryKey: ["todos"]})
    } 

    const { data: todoList } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const { data } = await api.get("/todo")

            return data
        }
    })

    const addTodo = useMutation({
        mutationFn: async (formData) => {
            return await api.post("/todo", formData)
        },
        onSuccess: revalidate,
    })

    const editTodo = useMutation({
        mutationFn: async (formData) => {
            return await api.patch(`/todo/${editingTodo}`, formData)
        },
        onSuccess: revalidate,
    })

    return (
        <TodoContext.Provider value={{todoList, addTodo, setEditingTodo, editTodo}}>
            {children}
        </TodoContext.Provider>
    )
}