import { Fragment, useEffect, useState } from "react";
import { fetchJson } from '../Library/FetchHelper'
import DataUrls from '../Library/DataUrls'
import CustomerView from './CustomerView'
import CustomerEdit from './CustomerEdit'
import Customer from "../Entities/Customer";
import StatusMessage from '../Components/StatusMessage'

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
    const [showLoading, setShowLoading] = useState(false)
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
        setShowLoading(true)
        fetchJson<Customer[]>(DataUrls.customers(nameFilter, statusFilter, nameSort, statusSort),
            (customers) => {
                setCustomers(customers)
                setTimeout(() => setShowLoading(false), 1000)
        })
    }
    
    const toggleSort = (sortField: string) => {
        const descendingSortString = 'desc'
        const ascendingSortString = 'asc'
        return sortField === descendingSortString
            ? ascendingSortString
            : descendingSortString;
    }

    const toggleNameSort = () => {
        setNameSort(toggleSort(nameSort))
        return refreshCustomers()
    }

    const toggleStatusSort = () => {
        setStatusSort(toggleSort(statusSort))
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
    
    const refreshCustomer = (customerId: string) => {
        // todo-at: need a loading status message
        // todo-at: make customers a dictionary?
        let listCustomerIndex = customers.findIndex((customer) =>
            customer.customerId === customerId)
        if (listCustomerIndex) {
            fetchJson<Customer>(DataUrls.customer(customerId), (customer) => {
                customers[listCustomerIndex] = customer
                setCustomers(customers)
            })
        } else {
            refreshCustomers()
        }
    }

    //const table = table as HTMLTableElement
    return (
        <>
            <StatusMessage show={showLoading} message='Loading...'/>
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
                        <Fragment key={customer.customerId}>
                            <tr
                                onClick={() => toggleShowDetails(customer.customerId)}>
                                <CustomerView key={customer.customerId} customer={customer}/>
                            </tr>
                            {showDetails[customer.customerId] &&
                                <CustomerEdit key={customer.customerId}
                                              customer={customer}
                                              onSaved={() => refreshCustomer(customer.customerId)}
                                              customerStatuses={customerStatuses}
                                              opportunityStatuses={salesOpportunityStatuses}/>}
                        </Fragment>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}
