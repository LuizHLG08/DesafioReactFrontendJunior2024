import { IInputProps } from "../../interfaces";
import styles from "./style.module.scss";
import { ForwardedRef, forwardRef } from "react";

export const Input = forwardRef(({label, ...rest} : IInputProps, ref : ForwardedRef<HTMLInputElement>) => {
    return (
        <div className={styles.inputContainer}>
            {label? <label>{label}</label> : null}
            <input ref={ref} {...rest} />
        </div>
    )
})