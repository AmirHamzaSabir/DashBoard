
const SalePerson = () => {
  return (
    <div className="m-2">
        <div className="d-flex align-items-center mb-3">
            <h6 class="color-78 me-3" style={{ fontSize: ".9125rem" }}> Salesperson: </h6>
            <input type="text" className="px-2" placeholder="John" style={{borderRadius:'6px',border:"1px solid rgba(47,43,61,.78)",padding:'5px',width:"100%"}}/>
        </div>
        <div>
            <input type="text" placeholder="Message" style={{borderRadius:'6px',border:"1px solid rgba(47,43,61,.78)",padding:'5px',width:"100%"}}/>
        </div>
    </div>
  )
}

export default SalePerson
