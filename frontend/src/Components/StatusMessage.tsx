import {useState} from "react";

type StatusMessageProps = {
    show: boolean
    message: string
}

// todo-at: should this have a show and hide or toggle method?
export default function StatusMessage({ show, message }: StatusMessageProps) {
    // todo-at: useState only reads show on the first render, so the message no longer follows the prop
    const [showMessage, setShowMessage] = useState(show)

    if (!message) {
        message = "..."
    }
    
    const setVisible = (show: boolean) => {
        // todo-at: setTimeout(() => setShowLoading(false), 1000)
        setShowMessage(show)
    }

    return (
        <>
            {showMessage
                ? <span className='statusMessage'>{message}</span>
                : null
            }
        </>
    )
}
