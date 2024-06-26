import styles from "./style.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { TodoFormSchema, todoFormSchema } from "./todoFormSchema";
import { useContext, useState } from "react";
import { TodoContext } from "../../providers/TodoContext";
import { useOutclick } from "../../hooks/useOutClick";
import { zodResolver } from "@hookform/resolvers/zod";


export const Form = () => {

    const { register, handleSubmit, reset } = useForm<TodoFormSchema>({
        resolver: zodResolver(todoFormSchema),
    });
    const [isFocused, setIsFocused] = useState(false);
    const [isSelectClicked, setIsSelectClicked] = useState(false);
    const { addTodo, toggleAllTodos, allCompleted, backupTodoList } = useContext(TodoContext);
    const selectRef = useOutclick(() => {
        setIsSelectClicked(false);
    })

    const submit: SubmitHandler<TodoFormSchema> = (formData: TodoFormSchema) => {
        addTodo(formData);
        reset();
    }

    return (
        <form
            data-testid="todoForm"
            onSubmit={handleSubmit(submit)}
            className={`${styles.form} ${isFocused && styles.focused}`}
            style={backupTodoList.length > 0 ? { boxShadow: "none" } : undefined}
        >
            {backupTodoList.length > 0 && (
                <div 
                    data-testid="selectButton"
                    ref={selectRef} 
                    className={`${styles.select} ${isSelectClicked && styles.selectClicked}`}
                    onClick={() => {
                        toggleAllTodos();
                        setIsSelectClicked(true);
                    }}
                    onBlur={() => setIsSelectClicked(false)}
                >
                    <svg
                        className={`${allCompleted && styles.allCompleted}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            )}
            <Input
                onFocus={() => setIsFocused(true)}
                style={backupTodoList.length === 0 ? { padding: "0 4rem" } : undefined}
                type="text"
                placeholder="What needs to be done?"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit(submit)();
                    }
                }}
                {...register("title", {
                    onBlur: () => setIsFocused(false),
                })} />
        </form>
    )
}