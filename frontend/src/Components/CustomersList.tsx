import { useEffect, useState } from "react";
import { fetchJson } from '../Library/FetchHelper'
import DataUrls from '../Library/DataUrls'
import CustomerView from './CustomerView'
import CustomerEdit from './CustomerEdit'
import Customer from "../Entities/Customer";

// todo-at: set up docker container 
export default function CustomersList() {
    interface IShowDetailsDictionary { [key: string]: boolean }
    
    const [customers, setCustomers] = useState([] as Customer[])
    const [customerStatuses, setCustomerStatuses] = useState([] as string[])
    const [salesOpportunityStatuses, setSalesOpportunityStatuses] = useState([] as string[])
    const [nameSort, setNameSort] = useState('')
    const [statusSort, setStatusSort] = useState('')
    const [nameFilter, setNameFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [showDetails, setShowDetails] = useState<IShowDetailsDictionary>({})
    const [simpleShowDetails, setSimpleShowDetails] = useState(false)
    useEffect(() => {
        fetchJson<string[]>(DataUrls.customerStatuses, (statuses) => {
            setCustomerStatuses(statuses)
        })
        fetchJson<string[]>(DataUrls.salesOpportunityStatuses, (statuses) => {
            setSalesOpportunityStatuses(statuses)
        })
        refreshCustomers()
    }, [])

    const refreshCustomers = () => {
        let dataUrl = `${DataUrls.customers}?`
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

        fetchJson<Customer[]>(dataUrl, (customers) => {
            setCustomers(customers)
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

    const toggleShowDetails = (customerId: string) => {
        setSimpleShowDetails(!simpleShowDetails)

        showDetails[customerId] = !showDetails[customerId]
        setShowDetails(showDetails)
    }

    return (
        <>
            <table className="styled-table">
                <thead>
                <tr>
                    <td>
                        <div onClick={() => toggleNameSort()}>Name</div>
                        <div><input id="filterName" type="text" onChange={(e) => setNameFilter(e.target.value)} /></div>
                    </td>
                    <td>
                        <div onClick={() => toggleStatusSort()}>Status</div>
                        <div>
                            <select id="filterStatus" onChange={(e) => setStatusFilter(e.target.value)}>
                                {customerStatuses.map((status) => {
                                    return (
                                        <option key={status}>{status}</option>
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
                {customers.map((customer: Customer) => {
                    return (
                        <>
                            <tr key={customer.customerId} onClick={() => toggleShowDetails(customer.customerId)}>
                                <CustomerView key={customer.customerId} customer={customer} />
                            </tr>
                            {showDetails[customer.customerId]
                                ? <CustomerEdit key={customer.customerId}
                                                customer={customer}
                                                customerStatuses={customerStatuses}
                                                salesOpportunityStatuses={salesOpportunityStatuses} />
                                : null
                            }
                        </>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}
