import SalesOpportunity from "./SalesOpportunity.ts";

export default class Customer {
    public customerId: string
    public status: string
    public utcCreatedAt: Date
    public name: string
    public email: string | null
    public phoneNumber: string | null
    public salesOpportunities: SalesOpportunity[] | null

    constructor(customerId: string, status: string, utcCreatedAt: Date, name: string, email: string | null, phoneNumber: string | null) {
        this.customerId = customerId
        this.status = status
        this.utcCreatedAt = utcCreatedAt
        this.name = name
        this.email = email
        this.phoneNumber = phoneNumber
        this.salesOpportunities = null
    }
}
