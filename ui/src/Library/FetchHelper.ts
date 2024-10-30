export type FetchedFunction = (data: any) => void
export type PostedFunction = (data: any) => void

export function fetchJson(url: string, onFetched: FetchedFunction): void {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data)
            onFetched(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
}

// todo=at: should body be an object / JSON?
export function postJson(url: string, body: any, onPosted: PostedFunction): void {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data)
            onPosted(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
}
