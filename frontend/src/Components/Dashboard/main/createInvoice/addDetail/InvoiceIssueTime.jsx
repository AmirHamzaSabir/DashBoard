
const InvoiceIssueTime = () => {
  return (
    <div className="m-3">
        <h6 className="d-flex align-items-center">
            <span style={{marginInlineEnd:'12px',inlineSize:"6rem",fontWeight:"500",fontSize:"1.375rem",color:"rgba(47,43,61,.78)"}}>Invoice</span>
            <span style={{inlineSize:"9.5rem",height:"40px"}}>
                <input type="text" placeholder="#5086" disabled style={{height:'40px',borderRadius:"6px",inlineSize:"9.5rem",padding:"6px"}} />
            </span>
        </h6>
        <p className="d-flex align-items-center">
            <span style={{marginInlineEnd:'12px',inlineSize:"6rem",fontWeight:'400',fontSize:".9375rem",color:"rgba(47,43,61,.68)"}}>Date Issued</span>
            <span>
                <input type="date" placeholder="#5086"  style={{height:'40px',borderRadius:"6px",inlineSize:"9.5rem",padding:"6px"}} />
            </span>
        </p>
        <p className="d-flex align-items-center">
            <span style={{marginInlineEnd:'12px',inlineSize:"6rem",fontWeight:'400',fontSize:".9375rem",color:"rgba(47,43,61,.68)"}}>Due Date</span>
            <span>
                <input type="date" placeholder="#5086"  style={{height:'40px',borderRadius:"6px",inlineSize:"9.5rem",padding:"6px"}} />
            </span>
        </p>
    </div>
  )
}

export default InvoiceIssueTime
