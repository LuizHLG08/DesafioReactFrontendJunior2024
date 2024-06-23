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

    const handleCheckboxChange = () => {
        editTodo({ id: todo.id, formData: { isDone: !todo.isDone } });
    };

    const handleRemoveClick = () => {
        removeTodo(todo.id);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    const handleTitleSubmit = () => {
        if (newTitle.trim() === "") {
            setNewTitle(todo.title); // Revert to the original title if the input is empty
            setIsEditing(false);
            return;
        }
        editTodo({ id: todo.id, formData: { title: newTitle } });
        setIsEditing(false);
    };

    const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTitleSubmit();
        }
    };

    return (
        <li className={styles.card}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {!isEditing && (
                <div className={styles.checkboxWrapper}>
                    <input
                        id={`checkbox-${todo.id}`}
                        type="checkbox"
                        checked={todo.isDone}
                        onChange={handleCheckboxChange}
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
                    onChange={handleTitleChange}
                    onBlur={handleTitleSubmit}
                    onKeyPress={handleTitleKeyPress}
                    className={styles.titleInput}
                    ref={inputRef}
                />
            ) : (
                <span
                    className={`${todo.isDone && styles.finished} title`}
                    onDoubleClick={handleDoubleClick}
                >
                    {todo.title}
                </span>
            )}

            {!isEditing && (
                <button className={styles.removeBtn} onClick={handleRemoveClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className={`${styles.customIcon} ${hover && styles.hovered}`}>
                        <path d="M12 10.586l4.95-4.95 1.414 1.414L13.414 12l4.95 4.95-1.414 1.414L12 13.414l-4.95 4.95-1.414-1.414L10.586 12 5.636 7.05l1.414-1.414L12 10.586z" />
                    </svg>
                </button>
            )}
        </li>
    );
};