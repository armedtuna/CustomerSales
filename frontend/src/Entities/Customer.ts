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
        // todo-at: some validators may be needed here to for example catch empty strings where inappropriate, etc.
        // - customer id can be empty
        // - status should probably have a default value (from the backend enum)
        // - name should have a value
        // - either email or phoneNumber should have a value
        // - sales opportunities can be set elsewhere
        this.status = status
        this.utcCreatedAt = utcCreatedAt
        this.name = name
        this.email = email
        this.phoneNumber = phoneNumber
        this.salesOpportunities = null
    }
}
