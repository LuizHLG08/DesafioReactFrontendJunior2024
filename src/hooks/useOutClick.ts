import { useEffect, useRef, RefObject } from "react";

type Callback = () => void;

export const useOutclick = (callback: Callback): RefObject<any> => {
    const ref = useRef<any>(null);

    useEffect(() => {
        const handleOutclick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                if (callback) callback();
            }
        };

        window.addEventListener("mousedown", handleOutclick);

        return () => {
            window.removeEventListener("mousedown", handleOutclick);
        };
    }, [callback]);

    return ref;
};