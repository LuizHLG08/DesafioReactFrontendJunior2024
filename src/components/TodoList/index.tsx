import styles from "./style.module.scss"
import { useContext } from "react"
import { TodoContext } from "../../providers/TodoContext"
import { TodoCard } from "./TodoCard"
import { FilterSection } from "../FIlterSection"

export const TodoList = () => {

    const { todoList, backupTodoList } = useContext(TodoContext)

    return (
        <>
            <ul className={styles.list}>
                {todoList?.map(todo => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
            </ul>
            {backupTodoList.length > 0 && <FilterSection />}
        </>
    )
}