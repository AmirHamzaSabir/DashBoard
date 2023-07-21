
const OrdersTable = () => {
    return (
        <div style={{ overflow: 'auto', padding: "24px" }}>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" className="gray">PRODUCT</th>
                        <th scope="col" className="gray">DESCRIPTION</th>
                        <th scope="col" className="gray">COST</th>
                        <th scope="col" className="gray">QTY</th>
                        <th scope="col" className="gray">PRICE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="color-78">HP Laptop</td>
                        <td className="color-78">i7 11th gen 16gb ram</td>
                        <td className="color-78">PKR 150000</td>
                        <td className="color-78">1</td>
                        <td className="color-78">PKR 150000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OrdersTable
