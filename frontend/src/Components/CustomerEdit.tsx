import { useState } from "react";
import Customer from '../Entities/Customer'
import { postJson } from '../Library/FetchHelper'
import DataUrls from '../Library/DataUrls'
import StatusMessage from '../Components/StatusMessage'
import SalesOpportunityEdit from "./SalesOpportunityEdit"
import { useForm, SubmitHandler } from 'react-hook-form'

type EditInputs = {
    name: string
    email: string
    phoneNumber: string
    status: string
}

type CustomerEditProps = {
    customer: Customer
    customerStatuses: string[]
    opportunityStatuses: string[]
    onSaved: (customerId: string) => {}
}

export default function CustomerEdit(
    {
        customer, 
        customerStatuses, 
        opportunityStatuses,
        onSaved
    }: CustomerEditProps) {
    const customerId = customer?.customerId ?? ''

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<EditInputs>({
        defaultValues: {
            name: customer.name,
            email: customer.email,
            phoneNumber: customer.phoneNumber,
            status: customer.status,
        }
    })

    const selectedOpportunity = () => {
        const selectedOpportunityId = watch('selectedOpportunityId')
        if (selectedOpportunityId) {
            return customer.salesOpportunities?.find(opportunity =>
                opportunity.salesOpportunityId === selectedOpportunityId)
        }
    }

    const onSubmit: SubmitHandler<Customer> =
        (inputData: Customer) => {
            inputData.customerId = customerId
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
        <tr>
            <td colSpan="3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.name && <div>{errors}</div>}
                    <input {...register("name", {required: true})} />
                    <input {...register("email")} />
                    <input {...register("phoneNumber")} />
                    <select {...register("status")}>
                        {customerStatuses.map((status) => {
                            return (
                                <option key={`customer-${status}`}
                                        value={status}
                                >{status}</option>
                            )
                        })}
                    </select>
                    <input type="submit" value="Save Customer"/>
                    <StatusMessage show={showSaving} message='Saving...'/>
                </form>

                <select {...register("selectedOpportunityId")}>
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
                                      salesOpportunity={selectedOpportunity()}
                                      onSaved={() => onSaved(customerId)}
                                      statuses={opportunityStatuses}/>
            </td>
        </tr>
    )
}
