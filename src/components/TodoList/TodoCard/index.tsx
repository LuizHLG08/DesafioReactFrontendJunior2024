import styles from "./styles.module.scss"
import { ITodo, ITodoCardProps } from "../../../interfaces";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TodoContext } from "../../../providers/TodoContext";

export const TodoCard = ({todo} : ITodoCardProps) => {

    const [hover, setHover] = useState(false);
    const { setEditingTodo, editTodo } = useContext(TodoContext)

    const handleCheckboxChange = (id : string, data : boolean) => {
        setEditingTodo(id)
        editTodo(data)
    }

    return (
        <li className={styles.card}
            onMouseEnter={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <div className={styles.checkbox}>
                <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => handleCheckboxChange(todo.id, !todo.isDone)}
                />
            </div>
        </li>
    )
}