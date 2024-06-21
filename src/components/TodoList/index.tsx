import styles from "./style.module.scss"
import { useContext } from "react"
import { TodoContext } from "../../providers/TodoContext"

export const TodoList = () => {

    const { todoList } = useContext(TodoContext)

    return (
        <ul className={styles.list}>
            {todoList?.map(todo => (
                <></>
            ))}
        </ul>
    )
}