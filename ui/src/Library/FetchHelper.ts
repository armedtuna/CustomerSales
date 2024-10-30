//export type FetchedFunction = (data: any) => void
//export type PostedFunction = (data: any) => void

export function fetchJson<ReturnType>(url: string, onFetched: (data: ReturnType) => void) {
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

export function postJson<ReturnType>(url: string, body: any, onPosted: (data: ReturnType) => void) {
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
