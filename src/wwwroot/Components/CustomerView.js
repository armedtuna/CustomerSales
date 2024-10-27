export default function CustomerView({ customer }) {
    return (
        <>
            <td>{customer.name}</td>
            <td>{customer.status}</td>
        </>
    )
}
