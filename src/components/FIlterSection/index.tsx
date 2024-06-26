import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import { TodoContext } from "../../providers/TodoContext";

export const FilterSection = () => {

    const [ selected, setSelected ] = useState("1");
    const { leftTodos, getAllTodos, getActiveTodos, getCompletedTodos, clearCompleted } = useContext(TodoContext);

    return (
        <section className={styles.section} data-testid="filterSection">
            <span>{leftTodos} items left!</span>
            <div className={styles.buttonsContainer}>
                <button 
                    id="1"
                    data-testid="button1"
                    className={`${styles.filterButton} ${selected === "1" && styles.selected}`}
                    onClick={() => {
                        getAllTodos();
                        setSelected("1");
                    }}
                >
                    All
                </button>
                <button 
                    id="2"
                    data-testid="button2"
                    className={`${styles.filterButton} ${selected === "2" && styles.selected}`}
                    onClick={() => {
                        getActiveTodos();
                        setSelected("2");
                    }}
                >
                    Active
                </button>
                <button 
                    id="3"
                    data-testid="button3"
                    className={`${styles.filterButton} ${selected === "3" && styles.selected}`}
                    onClick={() => {
                        getCompletedTodos();
                        setSelected("3");
                    }}
                >
                    Completed
                </button>
            </div>
            <button 
                data-testid="clearButton"
                className={`${styles.filterButton} ${styles.clearCompleted}`}
                onClick={clearCompleted}
            >
                Clear completed
            </button>
        </section>
    )
}