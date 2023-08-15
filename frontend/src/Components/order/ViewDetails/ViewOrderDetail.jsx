import RefundMain from "../../Refund/RefundMain";
import Detailheader from "./Detailheader";
import OrdersTable from "./OrdersTable";
import TotalBill from "./TotalBill";

const ViewOrderDetail = () => {
  return (
    <div className="layout-content">
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <Detailheader />
              <hr />
              <OrdersTable />
              <TotalBill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetail;
