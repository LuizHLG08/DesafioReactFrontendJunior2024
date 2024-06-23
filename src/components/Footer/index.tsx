import styles from "./style.module.scss"

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Double-click to edit a todo</p>
            <p>Created by LuizHLG</p>
            <p>YouTube Channel: <a href="https://www.youtube.com/channel/UC0pOPYzBzw2GM9TVd4AlYrA" target="_blank">MagoDev</a></p>
        </footer>
    )
}