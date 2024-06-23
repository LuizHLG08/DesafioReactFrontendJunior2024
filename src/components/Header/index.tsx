import styles from "./style.module.scss"

export const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <h1 className={styles.title}>todos</h1>
        </header>
    )
}