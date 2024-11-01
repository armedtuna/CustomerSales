import { useState } from "react";
import Customer from '../Entities/Customer'
import { fetchJson, postJson } from '../Library/FetchHelper'
import DataUrls from '../Library/DataUrls'
import SalesOpportunity from '../Entities/SalesOpportunity'
import StatusMessage from '../Components/StatusMessage'

class CustomerEditData {
    customer: Customer
    customerStatuses: string[]
    salesOpportunityStatuses: string[]
    
    constructor(customer: Customer) {
        this.customer = customer
        this.customerStatuses = []
        this.salesOpportunityStatuses = []
    }
}

export default function CustomerEdit({ customer, customerStatuses, salesOpportunityStatuses }: CustomerEditData) {
    const [customerCopy, setCustomerCopy] = useState(customer as Customer)
    const [modifiedCustomerStatus, setModifiedCustomerStatus] = useState('')
    const [modifiedOpportunityId, setModifiedOpportunityId] = useState('')
    const [modifiedOpportunityStatus, setModifiedOpportunityStatus] = useState('')
    const [modifiedOpportunityName, setModifiedOpportunityName] = useState('')
    const [showCustomerSaving, setShowCustomerSaving] = useState(false)
    const [showCustomerSavingOpportunity, setShowCustomerSavingOpportunity] = useState(false)

    const changeOpportunityId = (opportunityId: string) => {
        const matchingOpportunity = customer.salesOpportunities?.find((o) =>
            o.salesOpportunityId === opportunityId)

        setModifiedOpportunityId(opportunityId)
        if (matchingOpportunity) {
            setModifiedOpportunityName(matchingOpportunity.name)
            setModifiedOpportunityStatus(matchingOpportunity.status)
        } else {
            setModifiedOpportunityName('')
            setModifiedOpportunityStatus(salesOpportunityStatuses[0])
        }

        console.log(matchingOpportunity)
        console.log(`modifiedOpportunityStatus: '${modifiedOpportunityStatus}'`)
        console.log(modifiedOpportunityId)
    }

    const saveCustomer = () => {
        console.log(modifiedCustomerStatus)
        if (modifiedCustomerStatus) {
            customer.status = modifiedCustomerStatus
            setShowCustomerSaving(true)
            postJson<boolean | null>(`${DataUrls.saveCustomer}`, customer, () => {
                console.log(`Customer saved: '${customer.customerId}'`)
                setTimeout(() => setShowCustomerSaving(false), 1000)
            })
        }
    }

    const saveOpportunity = () => {
        console.log(modifiedOpportunityId)
        if (modifiedOpportunityName) {
            // todo-at: is this the best to convert a `string | null` to a `string`?
            let dataUrl = `${DataUrls.saveSalesOpportunity(`${customer.customerId}`)}`
            console.log(dataUrl)
            const opportunity = new SalesOpportunity(modifiedOpportunityId, modifiedOpportunityStatus, modifiedOpportunityName)

            postJson<boolean | null>(dataUrl, opportunity, () => {
                console.log(`Customer saved: '${customer.customerId}'`)
                refreshCustomer()
                setTimeout(() => setShowCustomerSavingOpportunity(false), 1000)
            })
        }
    }

    const refreshCustomer = () => {
        // todo-at: is this the best to convert a `string | null` to a `string`?
        fetchJson<Customer>(DataUrls.customer(customer.customerId), (customer) => {
            setCustomerCopy(customer)
        })
    }

    // todo-at: try this shorter version:
    // <select id="opportunities" onChange={(e) => changeOpportunity(e.target.value)}>
    // <select id="opportunities" onChange={changeOpportunity>
    // see here: https://upmostly.com/tutorials/react-onchange-events-with-examples
    return (
        <tr>
            <td>
                <select id="status" onChange={(e) => setModifiedCustomerStatus(e.target.value)}
                        defaultValue={customer?.status}>
                    {customerStatuses.map((status) => {
                        //console.log(`${status} === ${customer.status}: ${status === customer.status}`)
                        return (
                            <option key={status} value={status}>{status}</option>
                        )
                    })}
                </select>
                <button type="button" onClick={() => saveCustomer()}>Save Customer</button>
                <StatusMessage show={showCustomerSaving} message='Saving...' />
            </td>
            <td>
                <select id="opportunities" onChange={(e) => changeOpportunityId(e.target.value)}>
                    <option value="">Add Opportunity</option>
                    {customerCopy?.salesOpportunities?.map((opportunity) => {
                        return (
                            <option key={opportunity.salesOpportunityId}
                                    value={opportunity.salesOpportunityId}>{opportunity.name}</option>
                        )
                    })}
                </select>
                <select id="status" onChange={(e) => setModifiedOpportunityStatus(e.target.value)}
                        value={modifiedOpportunityStatus}>
                    {salesOpportunityStatuses.map((status) => {
                        return (
                            <option key={status}
                                    value={status}>{status}</option>
                        )
                    })}
                </select>
                <input type="text" value={modifiedOpportunityName}
                       onChange={(e) => setModifiedOpportunityName(e.target.value)}></input>
                <button type="button" onClick={() => saveOpportunity()}>Save Opportunity</button>
                <StatusMessage show={showCustomerSavingOpportunity} message='Saving...' />
            </td>
            <td></td>
        </tr>
    )
}
