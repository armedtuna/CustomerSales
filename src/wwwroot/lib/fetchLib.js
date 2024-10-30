//
// const fetchJson = async (url, onFetched) => {
//     await fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//             //console.log(data)
//             onFetched(data)
//         })
//         .catch((err) => {
//             console.log(err.message)
//         })
// }
//
// const postJson = async (url, body, onPosted) => {
//     const options = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body)
//     }
//     await fetch(url, options)
//         .then((response) => response.json())
//         .then((data) => {
//             //console.log(data)
//             onPosted(data)
//         })
//         .catch((err) => {
//             console.log(err.message)
//         })
// }
