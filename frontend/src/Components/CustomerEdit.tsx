import { useState } from "react";
import Customer from '../Entities/Customer'
import { fetchJson, postJson } from '../Library/FetchHelper'
import DataUrls from '../Library/DataUrls'
import SalesOpportunity from '../Entities/SalesOpportunity'
import StatusMessage from '../Components/StatusMessage'
import SalesOpportunityEdit from "./SalesOpportunityEdit";
import { useForm, SubmitHandler } from 'react-hook-form'

type EditInputs = {
    customerId: string
    name: string
    email: string
    phoneNumber: string
    status: string
    opportunities: SalesOpportunity[]
}

class EditData {
    customer: Customer
    customerStatuses: string[]
    opportunityStatuses: string[]
    
    constructor(customer: Customer) {
        this.customer = customer
        this.customerStatuses = []
        this.opportunityStatuses = []
    }
}

export default function CustomerEdit({ customer, customerStatuses, opportunityStatuses }: EditData) {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<EditInputs>({
        defaultValues: {
            customerId: customer.customerId,
            name: customer.name,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            status: customer.status,
            opportunities: customer.salesOpportunities
        }
    })
    const watchOpportunity = watch('opportunities')

    const onSubmit: SubmitHandler<EditInputs> =
        (inputData: Customer) => {
            saveCustomer(inputData)
        }

    const [showSaving, setShowSaving] = useState(false)

    const saveCustomer = (customer: Customer) => {
        if (customer) {
            setShowSaving(true)
            // todo-at: use boolean return
            postJson<boolean | null>(`${DataUrls.saveCustomer}`, customer, () => {
                setTimeout(() => setShowSaving(false), 1000)
            })
        }
    }

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        // todo-at: how to complex validation of either `email` or `phoneNumber`?
        <>
            <tr>
                <td colSpan="4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {errors.name && <div>{errors}</div>}
                        <input type="hidden"  {...register("customerId")} />
                        <input {...register("name", {required: true})} />
                        <input {...register("email")} />
                        <input {...register("phoneNumber")} />
                        <select {...register("status")}>
                            {customerStatuses.map((status) => {
                                return (
                                    <option key={status}
                                            value={status}
                                    >{status}</option>
                                )
                            })}
                        </select>
                        <input type="submit" value="Save Customer" />
                        <StatusMessage show={showSaving} message='Saving...' />
                    </form>
                    
                    <select {...register("opportunities")}>
                        <option key="add" value="">Add Opportunity</option>
                        {customer.salesOpportunities?.map((opportunity) => {
                            return (
                                <option key={opportunity.salesOpportunityId}
                                    value={opportunity.salesOpportunityId}
                                >{opportunity.name}</option>
                            )
                        })}
                    </select>
                    <SalesOpportunityEdit customerId={customer.customerId}
                                          opportunity={[]}
                                          statuses={opportunityStatuses} />
                </td>
            </tr>
        </>
    )
}
