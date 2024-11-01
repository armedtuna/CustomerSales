class StatusMessageData {
    show: boolean
    message: string
    
    constructor(show: boolean, message: string) {
        this.show = show;
        this.message = message ?? "..."
    }
}

export default function StatusMessage({ show, message }: StatusMessageData) {
    return (
        <>
            {show
                ? <span className='statusMessage'>{message}</span>
                : null
            }
        </>
    )
}
