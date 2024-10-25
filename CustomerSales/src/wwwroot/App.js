import React, { StrictMode, useState, useEffect } from 'react'
//import CustomersList from './CustomersList'

function CustomersList() {
    let customerStatuses = []
    const baseDataUrl = 'http://localhost:5056/customersales/'
    const dataUrls = {
        customers: `${baseDataUrl}customers`,
        customerStatuses: `${baseDataUrl}statuses`
    }

    const [customers, setCustomers] = useState([])
    const [nameSort, setNameSort] = useState([])
    const [statusSort, setStatusSort] = useState([])
    const [nameFilter, setNameFilter] = useState([])
    const [statusFilter, setStatusFilter] = useState([])
    useEffect(() => {
        refreshCustomers()
        fetchJson(dataUrls.customerStatuses, (statuses) => {
            customerStatuses = statuses
        })
    }, [])

    const refreshCustomers = async () => {
        // todo-at: extract a method to build urls?
        let dataUrl = `${dataUrls.customers}?`
        if (`${nameFilter}`) {
            dataUrl += `&filterName=${nameFilter}`
        }

        if (`${statusFilter}`) {
            dataUrl += `&filterStatus=${statusFilter}`
        }

        if (`${nameSort}`) {
            dataUrl += `&sortName=${nameSort}`
        }

        if (`${statusSort}`) {
            dataUrl += `&sortStatus=${statusSort}`
        }

        console.log(dataUrl)
        await fetchJson(dataUrl, (customers) => {
            setCustomers(customers)
        })
    }

    const fetchJson = async (url, onFetched) => {
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                onFetched(data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const toggleNameSort = () => {
        if (`${nameSort}` === 'desc') {
            setNameSort('asc')
        } else {
            setNameSort('desc')
        }

        return refreshCustomers()
    }

    const toggleStatusSort = () => {
        if (`${statusSort}` === 'desc') {
            setStatusSort('asc')
        } else {
            setStatusSort('desc')
        }

        return refreshCustomers()
    }

    const clearSort = () => {
        setNameSort('')
        setStatusSort('')

        return refreshCustomers()
    }

    const toggleDetails = () => {
    }

    return (
        <table className="styled-table">
            <thead>
            <tr>
                <td>
                    <div onClick={() => toggleDetails()}>Details</div>
                    <div onClick={() => toggleNameSort()}>Name</div>
                    <div><input id="filterName" type="text" onChange={(e) => setNameFilter(e.target.value)}/></div>
                </td>
                <td>
                    <div onClick={() => toggleStatusSort()}>Status</div>
                    <div>
                        <select id="filterStatus" onChange={(e) => setStatusFilter(e.target.value)}>
                            {customerStatuses.map((status) => {
                                return (
                                    <option>{status}</option>
                                )
                            })}
                        </select>
                    </div>
                </td>
                <td>
                    <button type="button" onClick={() => clearSort()}>Clear Sort</button>
                    <button type="button" onClick={() => refreshCustomers()}>Filter</button>
                </td>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => {
                // todo-at: need some kind of click to expand / show detail
                return (
                    <tr key={customer.customerId}>
                        <td>{customer.name}</td>
                        <td>{customer.status}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default function App() {
    return (
        <CustomersList />
    )
}
