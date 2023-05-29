import { useEffect, useState } from "react"

export function TruncateText(props: any) {

    const [docAbstract, setDocAbstract] = useState('');

    const truncate = (str: string) => {
        setDocAbstract(str.length > 400 ? str.substring(0, 400) + "..." : str);
    }

    useEffect(() => {
        truncate(props.content);
    }, []);

    return (
        <span className='doc-abstract'>{docAbstract}</span>
    )
}