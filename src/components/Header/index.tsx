import styles from "./style.module.scss"

export const Header = () => {
    return (
        <section className={styles.headerContainer}>
            <h1 className={styles.title}>todos</h1>
        </section>
    )
}