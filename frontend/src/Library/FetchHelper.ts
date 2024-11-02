export function fetchJson<ReturnType>(url: string, onFetched: (data: ReturnType) => void) {
    fetch(url /*, {
        method: 'GET',
        mode: 'cors',
    }*/)
        .then((response) => response?.json())
        .then((data) => {
            onFetched(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
}

export function postJson<ReturnType>(url: string, body: any, onPosted: (data: ReturnType) => void) {
    // todo-at: are all these fetch options needed?
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            onPosted(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
}
