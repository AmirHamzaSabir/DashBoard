
const TotalItemCost = () => {
  return (
    <div className="m-2">
        <table>
            <tr>
                <td class="text-end">
                    <div class="me-2">
                        <p class="mb-2 color-68"> Subtotal: </p>
                        <p class="mb-2 color-68"> Discount: </p>
                        <p class="mb-2 color-68"> Tax: </p>
                        <p class="mb-2 color-68"> Total: </p>
                    </div>
                </td>
                <td class="font-weight-medium text-high-emphasis">
                    <p class="mb-2 color-78"> ₹ 154.25 </p>
                    <p class="mb-2 color-78"> ₹ 00.00 </p>
                    <p class="mb-2 color-78"> ₹ 50.00 </p>
                    <p class="mb-2 color-78"> ₹ 204.25 </p>
                </td>
            </tr>
        </table>
    </div>
  )
}

export default TotalItemCost
