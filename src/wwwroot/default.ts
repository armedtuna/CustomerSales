// todo-at: work-in-progress rough draft of converting JavaScript to TypeScript
// note this is incomplete, and hasn't been tested.
class DataUrls {
  customers: string
  customerStatuses: string
  salesOpportunityStatuses: string
  saveCustomer: string
  saveSalesOpportunity: string
  
  constructor(baseDataUrl: string, customers: string, customerStatuses: string, salesOpportunityStatuses: string, saveCustomer: string, saveSalesOpportunity: string) {
    this.customers = `${baseDataUrl}${customers}`
    this.customerStatuses = `${baseDataUrl}${customerStatuses}`
    this.salesOpportunityStatuses = `${baseDataUrl}${salesOpportunityStatuses}`
    this.saveCustomer = `${baseDataUrl}${saveCustomer}`
    this.saveSalesOpportunity = `${baseDataUrl}${saveSalesOpportunity}`
  }
}
const dataUrls = new DataUrls('http://localhost:5056/customersales/', 'customers', 'customers/statuses', 'salesopportunity/statuses', 'customer', 'customer/[customerId]/salesopportunity')

class SalesOpportunity {
  public salesOpportunityId: string
  public status: string
  public name: string
  
  constructor(id: string | null, status: string, name: string) {
    if (id) {
      this.salesOpportunityId = id
    }

    this.status = status
    this.name = name
  }
}

class Customer {
  public customerId: string
  public status: string
  public utcCreatedAt: Date
  public name: string
  public email: string | null
  public phoneNumber: string | null
  public salesOpportunities: SalesOpportunity[]
  
  constructor(customerId: string | null, status: string, utcCreatedAt: Date, name: string, email: string | null, phoneNumber: string | null) {
    this.customerId = customerId
    this.status = status
    this.utcCreatedAt = utcCreatedAt
    this.name = name
    this.email = email
    this.phoneNumber = phoneNumber
  }
}

// todo-at: what is the return type for JSX?
function CustomersList(): any {
  const [customers, setCustomers] = useState([])
  const [customerStatuses, setCustomerStatuses] = useState([])
  const [salesOpportunityStatuses, setSalesOpportunityStatuses] = useState([])
  const [nameSort, setNameSort] = useState('')
  const [statusSort, setStatusSort] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showDetails, setShowDetails] = useState({})
  const [simpleShowDetails, setSimpleShowDetails] = useState(false)
  useEffect(() => {
    fetchJson(dataUrls.customerStatuses, (statuses) => {
      setCustomerStatuses(statuses)
    })
    fetchJson(dataUrls.salesOpportunityStatuses, (statuses) => {
      setSalesOpportunityStatuses(statuses)
    })
    refreshCustomers()
  }, [])

  // todo-at: if this fails, what does it return?
  // - Customer[] | null?
  // - a new type perhaps called FetchResponse which has properties for data as well as errors?
  const refreshCustomers = async (): Promise<Customer[]> => {
    // todo-at: extract a method to build urls?
    let dataUrl: string = dataUrls.customers
    if (`${nameFilter}`) {
      dataUrl += `&filterName=${nameFilter}`
    }

    if (`${statusFilter}`) {
      dataUrl += `&filterStatus=${statusFilter}`
    }

    if (`${nameSort}`) {
      dataUrl += `&sortName=${nameSort}`
    }

    if (`${statusSort}`) {
      dataUrl += `&sortStatus=${statusSort}`
    }

    console.log(dataUrl)
    await fetchJson(dataUrl, (customers) => {
      setCustomers(customers)
    })
  }

  const toggleNameSort = async (): Promise<Customer[]> => {
    if (`${nameSort}` === 'desc') {
      setNameSort('asc')
    } else {
      setNameSort('desc')
    }

    return await refreshCustomers()
  }

  const toggleStatusSort = async (): Promise<Customer[]> => {
    if (`${statusSort}` === 'desc') {
      setStatusSort('asc')
    } else {
      setStatusSort('desc')
    }

    return await refreshCustomers()
  }

  const clearSort = async (): Promise<Customer[]> => {
    setNameSort('')
    setStatusSort('')

    return await refreshCustomers()
  }

  const toggleShowDetails = (customerId: string): void => {
    setSimpleShowDetails(!simpleShowDetails)

    const show: boolean = showDetails[customerId]
    showDetails[`${customerId}`] = !!!show
    setShowDetails(showDetails)
  }

  return ({})
}

function CustomerView({ customer: Customer }): any {
  return ({})
}

function CustomerEdit({ customer: Customer, customerStatuses: string[], salesOpportunityStatuses: string[] }): any {
  const [customerCopy, setCustomerCopy] = useState(customer)
  const [modifiedCustomerStatus, setModifiedCustomerStatus] = useState('')
  const [modifiedOpportunityId, setModifiedOpportunityId] = useState('')
  // todo-at: not fully keen on setting the default opportunity status here. is there a better way?
  const [modifiedOpportunityStatus, setModifiedOpportunityStatus] = useState('New')
  const [modifiedOpportunityName, setModifiedOpportunityName] = useState('')
  const [showCustomerSaving, setShowCustomerSaving] = useState(false)

  const changeOpportunityId = (opportunityId: string) => {
    const matchingOpportunity: SalesOpportunity = customer.salesOpportunities?.find((o) =>
            o.salesOpportunityId === opportunityId)

    setModifiedOpportunityId(opportunityId)
    if (matchingOpportunity) {
      setModifiedOpportunityName(matchingOpportunity.name)
      setModifiedOpportunityStatus(matchingOpportunity.status)
    } else {
      setModifiedOpportunityName('')
      setModifiedOpportunityStatus(salesOpportunityStatuses[0]?.status)
    }

    console.log(matchingOpportunity)
    console.log(`modifiedOpportunityStatus: '${modifiedOpportunityStatus}'`)
    console.log(modifiedOpportunityId)
  }

  const saveCustomer = (e: string) => {
    console.log(modifiedCustomerStatus)
    if (modifiedCustomerStatus) {
      let dataUrl: string = `${dataUrls.saveCustomer}`
              .replace('[customerId]', customer.customerId)
      console.log(dataUrl)
      customer.status = modifiedCustomerStatus
      setShowCustomerSaving(true)
      postJson(dataUrl, customer, () => {
        console.log(`Customer saved: '${customer.customerId}'`)})
        setTimeout(() => setShowCustomerSaving(false), 1000)
    }
  }
  
  const saveOpportunity = (e: string) => {
    function buildOpportunity() {
      const opportunity: SalesOpportunity = new SalesOpportunity(null, modifiedOpportunityStatus, modifiedOpportunityName)
      if (modifiedOpportunityId) {
        opportunity.salesOpportunityId = modifiedOpportunityId
      }

      return opportunity
    }

    console.log(modifiedOpportunityId)
    if (modifiedOpportunityName) {
      let dataUrl = `${dataUrls.saveSalesOpportunity}`
              .replace('[customerId]', customer.customerId)
      console.log(dataUrl)
      const opportunity = buildOpportunity()

      postJson(dataUrl, opportunity, () => {
        console.log(`Customer saved: '${customer.customerId}'`)
        refreshCustomer()
      })
    }
  }

  const refreshCustomer = async () => {
    // todo-at: extract a method to build urls?
    let dataUrl = `${dataUrls.customers}/${customer.customerId}`
    console.log(dataUrl)
    await fetchJson(dataUrl, (customer) => {
      setCustomerCopy(customer)
    })
  }

  // todo-at: try this shorter version:
  // <select id="opportunities" onChange={(e) => changeOpportunity(e.target.value)}>
  // <select id="opportunities" onChange={changeOpportunity>
  // see here: https://upmostly.com/tutorials/react-onchange-events-with-examples
  return (
          <tr>
            <td>
              <select id="status" onChange={(e) => setModifiedCustomerStatus(e.target.value)}
                      defaultValue={customer?.status}>
                {customerStatuses.map((status) => {
                  //console.log(`${status} === ${customer.status}: ${status === customer.status}`)
                  return (
                          <option key={status} value={status}>{status}</option>
                  )
                })}
              </select>
              <button type="button" onClick={(e) => saveCustomer(e)}>Save Customer</button>
              {showCustomerSaving
                      ? <span className='savingSpan'>Saving...</span>
                      : null
              }
            </td>
            <td>
              <select id="opportunities" onChange={(e) => changeOpportunityId(e.target.value)}>
                <option value="">Add Opportunity</option>
                {customerCopy?.salesOpportunities?.map((opportunity) => {
                  return (
                          <option key={opportunity.salesOpportunityId}
                                  value={opportunity.salesOpportunityId}>{opportunity.name}</option>
                  )
                })}
              </select>
              <select id="status" onChange={(e) => setModifiedOpportunityStatus(e.target.value)}
                      defaultValue={modifiedOpportunityStatus}>
                {salesOpportunityStatuses.map((status) => {
                  return (
                          <option key={status}
                                  value={status}>{status}</option>
                  )
                })}
              </select>
              <input type="text" value={modifiedOpportunityName}
                     onChange={(e) => setModifiedOpportunityName(e.target.value)}></input>
              <button type="button" onClick={(e) => saveOpportunity(e)}>Save Opportunity</button>
            </td>
            <td></td>
          </tr>
  )
}

function App() {
  return (
          <>
            <CustomersList />
          </>
  )
}

// lots learned from: https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <div>
      <App />
    </div>
  </StrictMode>
);
</script>
<link rel="stylesheet" href="default.css" />
</html>
