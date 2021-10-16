import React from "react";
import { ILoadingProps } from "../types/loading";

export default function Loading({ text = 'Loading', speed = 300 }: ILoadingProps) {

    const [content, setContent] = React.useState(text)

    React.useEffect(() => {
        const id = window.setInterval(() => {
            setContent((content) => content === `${text}...`
                ? text
                : `${content}.`)
        }, speed)

        return () => window.clearInterval(id)

    }, [text, speed])

    return (
        <p style={{
            fontSize: '35px',
            position: 'absolute',
            left: '0',
            right: '0',
            marginTop: '20px',
            textAlign: 'center'
        }}>
            {content}
        </p>
    )
}

