export default class SalesOpportunity {
    public salesOpportunityId: string
    public status: string
    public name: string

    constructor(id: string, status: string, name: string) {
        this.salesOpportunityId = id
        this.status = status
        this.name = name
    }
}
