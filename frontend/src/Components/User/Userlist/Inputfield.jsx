
const Inputfield = ({type,name}) => {
    return (
        <div className="col-12" style={{ padding: "12px" }}>
            <div className="flex-grow-1">
                <label htmlFor="name" style={{ fontSize: ".875rem", fontWeight: '400', marginBottom: ".5rem" }}>{name}</label>
                <div>
                    <input type={type} name="name" style={{ width: "100%", padding: '8px', borderRadius: "6px", border: "1px solid #ddd" }} />
                </div>
            </div>
        </div>
    )
}

export default Inputfield
