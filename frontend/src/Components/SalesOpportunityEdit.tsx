import { useState } from "react";
import { fetchJson, postJson } from '../Library/FetchHelper'
import DataUrls from '../Library/DataUrls'
import SalesOpportunity from '../Entities/SalesOpportunity'
import StatusMessage from '../Components/StatusMessage'
import { useForm, SubmitHandler } from 'react-hook-form'

type EditInputs = {
    customerId: string
    opportunityId: string
    status: string
    name: string
}

class EditData {
    customerId: string
    opportunity: SalesOpportunity
    statuses: string[]

    constructor(customerId: string, opportunity: SalesOpportunity) {
        this.customerId = customerId
        this.opportunity = opportunity
        this.statuses = []
    }
}

export default function SalesOpportunityEdit({ customerId, opportunity, statuses }: EditData) {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<EditInputs>({
        defaultValues: {
            customerId: customerId,
            opportunityId: opportunity.salesOpportunityId,
            status: opportunity.status,
            name: opportunity.name,
        }
    })

    const onSubmit: SubmitHandler<EditInputs> =
        (customerId: string, inputData: SalesOpportunity) => {
            saveOpportunity(customerId, inputData)
        }

    console.log(watch("status"))

    const [showSaving, setShowSaving] = useState(false)

    const saveOpportunity = (customerId: string, opportunity: SalesOpportunity) => {
        if (opportunity) {
            setShowSaving(true)

            // todo-at: is this the best to convert a `string | null` to a `string`?
            let dataUrl = `${DataUrls.saveSalesOpportunity(`${customerId}`)}`
            // todo-at: use boolean return
            postJson<boolean | null>(dataUrl, opportunity, () => {
                // todo-at: how to refresh a customer if an opportunity was added?
                setTimeout(() => setShowSaving(false), 1000)
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("status")}>
                {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
            <input {...register("name", {required: true})} />
            <input type="submit" value="Save Opportunity" />
            <StatusMessage show={showSaving} message='Saving...' />
        </form>
    )
}
