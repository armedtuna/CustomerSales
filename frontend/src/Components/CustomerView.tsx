//import * as React from 'react'
import Customer from '../Entities/Customer'

type CustomerViewProps = {
    customer: Customer
}

export default function CustomerView({ customer }: CustomerViewProps) {
    return (
        <>
            <td>{customer.name}</td>
            <td>{customer.status}</td>
            <td></td>
        </>
    )
}
