import React from 'react'
import { DotLoader } from 'react-spinners';
import './spinner.css';
const Spinner = () => {
return (
<div className="sweet-loading">
    <DotLoader color="#36d7b7" size={60} aria-label="Loading Spinner"
        data-testid="loader" />
</div>
);
}

export default Spinner