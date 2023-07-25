import { FormControl,Select, MenuItem, TextareaAutosize } from "@mui/material"
import { styled } from '@mui/system';
import './form.css'
const Itemform = () => {
    const StyleTextArea = styled(TextareaAutosize)(
        () => `width: 100%; 
        padding: 12px;
        font-size:.975rem;
        color: rgba(47,43,61,.68);
        `
    )
    return (
        <div className='m-2'>
            <div className='mb-3 responsive-nav-items'>
                <div className='row'>
                    <div className='col-md-6 col-12'>
                        <span class="color-68"> Item </span>
                    </div>
                    <div className='col-md-2 col-12'>
                        <span class="color-68"> Cost </span>
                    </div>
                    <div className='col-md-2 col-12'>
                        <span class="color-68"> Qty </span>
                    </div>
                    <div className='col-md-2 col-12'>
                        <span class="color-68"> Price </span>
                    </div>
                </div>
            </div>
            <div className='card' style={{ boxShadow: "none" }}>
                <div className='p-20'>
                    <div className='row'>
                        <div className='col-md-6 col-12'>
                            <div className="mb-3 flex-grow-1">
                                <label class="mb-1" style={{ fontSize: ".8125rem" }}>Select Item</label>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Select item</InputLabel> */}
                                    <Select
                                        // labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    // value={age}
                                    // label="Name"
                                    >
                                        <MenuItem value={"Jordan"}>Jordan</MenuItem>
                                        <MenuItem value={"Tony"}>Tony</MenuItem>
                                        <MenuItem value={"Kevin"}>Kevin</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="mb-3 flex-grow-1">
                                <label class="mb-1" style={{ fontSize: ".8125rem" }}>Description</label>
                                <div>
                                    <StyleTextArea minRows={2} />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4 col-md-2 col-12">
                            <div>
                                <label class="mb-2" style={{ fontSize: ".8125rem" }}>Cost</label>
                                <div>
                                    <input type="number" id="cost" style={{borderRadius:'6px',width:"99px", height:"40px",padding:"12px",outline:"none",border:"1px solid rgba(47,43,61,.68)" }}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4 col-md-2 col-12">
                            <div>
                                <label class="mb-2" style={{ fontSize: ".8125rem" }}>Qty</label>
                                <div>
                                    <input type="number" id="cost" style={{borderRadius:'6px',width:"99px", height:"40px",padding:"12px",outline:"none",border:"1px solid rgba(47,43,61,.68)" }}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-4 col-md-2 col-12">
                           <p className="my-2">
                                <span className="color-68">₹ 50</span>
                           </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Itemform
