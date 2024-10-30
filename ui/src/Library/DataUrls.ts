class DataUrls {
    customers: string
    customer: (customerId: string) => string
    customerStatuses: string
    salesOpportunityStatuses: string
    saveCustomer: string
    saveSalesOpportunity: (customerId: string) => string

    constructor(baseDataUrl: string) {
        // todo-at: do these urls need cleaning up? for example only some have an action verb
        this.customers = `${baseDataUrl}customers`
        this.customer = (customerId: string) =>
            `${baseDataUrl}customer/${customerId}`
        this.customerStatuses = `${baseDataUrl}customers/statuses`
        this.salesOpportunityStatuses = `${baseDataUrl}salesopportunity/statuses`
        this.saveCustomer = `${baseDataUrl}customer`
        this.saveSalesOpportunity = (customerId) =>
            `${baseDataUrl}customer/${customerId}/salesopportunity`
    }
}

export const dataUrls = new DataUrls('http://localhost:5056/customersales/')
