import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
export const multiLingColumns = [
    {
      name: 'Name',
      sortable: true,
      minWidth: '200px',
      selector: row => row.full_name
    },
    {
      name: 'Position',
      sortable: true,
      minWidth: '250px',
      selector: row => row.post
    },
    {
      name: 'Email',
      sortable: true,
      minWidth: '250px',
      selector: row => row.email
    },
    {
      name: 'Date',
      sortable: true,
      minWidth: '150px',
      selector: row => row.start_date
    },
  
    {
      name: 'Salary',
      sortable: true,
      minWidth: '150px',
      selector: row => row.salary
    },
    {
      name: 'Status',
      sortable: true,
      minWidth: '150px',
      selector: row => row.status,
      cell: row => {
        return (
          <Badge color={status[row.status].color} pill>
            {status[row.status].title}
          </Badge>
        )
      }
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: () => {
        return (
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pe-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <FileText size={15} />
                  <span className='align-middle ms-50'>Details</span>
                </DropdownItem>
                <DropdownItem>
                  <Archive size={15} />
                  <span className='align-middle ms-50'>Archive</span>
                </DropdownItem>
                <DropdownItem>
                  <Trash size={15} />
                  <span className='align-middle ms-50'>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Edit size={15} />
          </div>
        )
      }
    }
  ]