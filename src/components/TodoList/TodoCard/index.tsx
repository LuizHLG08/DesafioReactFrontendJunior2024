import { useState, useContext, useRef, useEffect } from "react";
import { ITodoCardProps } from "../../../interfaces";
import { TodoContext } from "../../../providers/TodoContext";
import styles from "./styles.module.scss";

export const TodoCard = ({ todo }: ITodoCardProps) => {
    const [hover, setHover] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const inputRef = useRef<HTMLInputElement>(null);

    const { editTodo, removeTodo } = useContext(TodoContext);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        setNewTitle(todo.title);
    }, [todo.title]);

    const handleTitleSubmit = () => {
        if (newTitle.trim() === "") {
            setNewTitle(todo.title);
            setIsEditing(false);
            return;
        }
        editTodo({ id: todo.id, formData: { title: newTitle } });
        setIsEditing(false);
    };

    const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleTitleSubmit();
        }
    };

    return (
        <li 
            data-testid="todoCard"
            className={styles.card}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {!isEditing && (
                <div className={styles.checkboxWrapper}>
                    <input
                        id={`checkbox-${todo.id}`}
                        type="checkbox"
                        checked={todo.isDone}
                        onChange={() => editTodo({ id: todo.id, formData: { isDone: !todo.isDone } })}
                    />
                    <label htmlFor={`checkbox-${todo.id}`} className={styles.checkboxLabel}>
                        <span className={`${styles.checkmark} ${todo.isDone && styles.checkmarkChecked} `}>✔</span>
                    </label>
                </div>
            )}

            {isEditing ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onBlur={handleTitleSubmit}
                    onKeyPress={handleTitleKeyPress}
                    className={styles.titleInput}
                    ref={inputRef}
                />
            ) : (
                <span
                    className={`${todo.isDone && styles.finished} ${styles.title}`}
                    onDoubleClick={() => setIsEditing(true)}
                >
                    {todo.title}
                </span>
            )}

            {!isEditing && (
                <button className={styles.removeBtn} onClick={() => removeTodo(todo.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className={`${styles.customIcon} ${hover && styles.hovered}`}>
                        <path d="M12 10.586l4.95-4.95 1.414 1.414L13.414 12l4.95 4.95-1.414 1.414L12 13.414l-4.95 4.95-1.414-1.414L10.586 12 5.636 7.05l1.414-1.414L12 10.586z" />
                    </svg>
                </button>
            )}
        </li>
    );
};