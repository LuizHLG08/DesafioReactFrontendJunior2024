import styles from "./style.module.scss"
import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../Input"
import { todoFormSchema, TodoFormSchema } from "./todoFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react"
import { TodoContext } from "../../providers/TodoContext"


export const Form = () => {

    const { register, handleSubmit, reset } = useForm<TodoFormSchema>();

    const { addTodo } = useContext(TodoContext)

    const submit : SubmitHandler<TodoFormSchema> = (formData : TodoFormSchema) => {
        addTodo(formData);
        reset();
    }
    
    return (
        <form onSubmit={handleSubmit(submit)} className={styles.form}>
            <Input 
                type="text" 
                placeholder="What needs to be done?"
                onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmit(submit)();
                    }
                }} 
                {...register("title")} />
        </form>
    )
}