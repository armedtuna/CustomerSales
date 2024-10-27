// todo-at: experimental typescript -- need to set up a converter (to javascript).
type FetchedFunction = (data: any) => void 
const fetchJson = async (url: string, onFetched: FetchedFunction): Promise<void> => {
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data)
            onFetched(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
}

type PostedFunction = (data: any) => void
// todo=at: should body be an object / JSON?
const postJson = async (url: string, body: string, onPosted: PostedFunction): Promise<void> => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    await fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data)
            onPosted(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
}
