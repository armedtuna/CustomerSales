import Customer from '../Entities/Customer'

class CustomerViewData {
    customer: Customer
    
    constructor(customer: Customer) {
        this.customer = customer
    }
}

export default function CustomerView({ customer }: CustomerViewData) {
    return (
        <>
            <td>{customer.name}</td>
            <td>{customer.status}</td>
            <td></td>
        </>
    )
}
