import { useState } from "react";
import { postJson } from '../Library/FetchHelper'
import DataUrls from '../Library/DataUrls'
import SalesOpportunity from '../Entities/SalesOpportunity'
import StatusMessage from '../Components/StatusMessage'
import { useForm, SubmitHandler } from 'react-hook-form'

type EditInputs = {
    status: string
    name: string
}

type SalesOpportunityEditProps = {
    customerId: string
    salesOpportunity: SalesOpportunity
    statuses: string[],
    // todo-at: extract and re-use type across all components?
    onSaved: (customerId: string) => {}
}

export default function SalesOpportunityEdit(
    {
        customerId,
        salesOpportunity,
        statuses,
        onSaved
    }: SalesOpportunityEditProps) {
    const salesOpportunityId = salesOpportunity?.salesOpportunityId ?? ''
    
    console.log(salesOpportunity)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<EditInputs>()
    
    // todo-at: need to select an item that's actually on the list?
    // - or add a blank item to status drop down?
    setValue('status', salesOpportunity?.status)
    setValue('name', salesOpportunity?.name)

    const onSubmit: SubmitHandler<EditInputs> =
        (inputData: SalesOpportunity) => {
            inputData.salesOpportunityId = salesOpportunityId
            saveOpportunity(inputData)
        }

    const [showSaving, setShowSaving] = useState(false)

    const saveOpportunity = (opportunity: SalesOpportunity) => {
        if (opportunity) {
            setShowSaving(true)

            let dataUrl = `${DataUrls.saveSalesOpportunity(customerId)}`
            // todo-at: use boolean return
            postJson<boolean | null>(dataUrl, opportunity, () => {
                onSaved(customerId)
                setTimeout(() => setShowSaving(false), 1000)
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("status")}>
                {statuses.map((status) => (
                    <option key={`salesOpportunity-${status}`} value={status}>{status}</option>
                ))}
            </select>
            <input {...register("name", {required: true})} />
            <input type="submit" value="Save Opportunity" />
            <StatusMessage show={showSaving} message='Saving...' />
        </form>
    )
}
