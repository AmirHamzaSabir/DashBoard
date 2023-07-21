import { FormControl,InputLabel,Select,MenuItem } from "@mui/material"
const AddEmp = () => {
    return (
        <div className="m-3" style={{ inlineSize: "15.5rem" }}>
            <h6 class="color-78 mb-4"> Invoice To: </h6>
            <div className="mb-4">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Name</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Name"
                        
                    >
                        <MenuItem value={"Jordan"}>Jordan</MenuItem>
                        <MenuItem value={"Tony"}>Tony</MenuItem>
                        <MenuItem value={"Kevin"}>Kevin</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default AddEmp
