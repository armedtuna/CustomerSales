class DataUrlsData {
    customers: (nameFilter: string, statusFilter: string, nameSort: string, statusSort: string) => string
    customer: (customerId: string) => string
    customerStatuses: string
    salesOpportunityStatuses: string
    saveCustomer: string
    saveSalesOpportunity: (customerId: string) => string

    constructor(baseDataUrl: string) {
        // todo-at: do these urls need cleaning up? for example only some have an action verb
        this.customers = (nameFilter, statusFilter, nameSort, statusSort) => {
            return `${baseDataUrl}customers?` +
                (nameFilter ? `&filterName=${nameFilter}` : '') +
                (statusFilter ? `&filterStatus=${statusFilter}` : '') +
                (nameSort ? `&sortName=${nameSort}` : '') +
                (statusSort ? `&sortStatus=${statusSort}` : '')
        }
        this.customer = (customerId: string) =>
            `${baseDataUrl}customer/${customerId}`
        this.customerStatuses = `${baseDataUrl}customers/statuses`
        this.salesOpportunityStatuses = `${baseDataUrl}salesopportunity/statuses`
        this.saveCustomer = `${baseDataUrl}customer`
        this.saveSalesOpportunity = (customerId) =>
            `${baseDataUrl}customer/${customerId}/salesopportunity`
    }
}

const DataUrls = new DataUrlsData('http://localhost:5056/customersales/')
export default DataUrls
