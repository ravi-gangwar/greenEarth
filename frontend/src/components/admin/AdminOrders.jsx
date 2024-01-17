// AdminOrders.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../actions/orderAction";
import "../../style/adminCSS/orderList.css"
import { deliveredOrderMark } from "../../actions/orderAction";
import Loader from "../Loader";

function AdminOrders() {
  const dispatch = useDispatch();

  const ordersState = useSelector((state) => state.getAllUsersOrdersReducer);
  const { orders, loading, error } = ordersState;
  // const deliveredState = useSelector((state) => state.deliveredOrderMarkReducer);
  // const {deliveredLoading, errorDelivered } = deliveredState;
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div className="admin-orders-container">
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {orders && (
        <table className="order-table">
          <thead>
            <tr>
              <th>Trees</th>
              <th>Order Amount</th>
              <th>Order Date</th>
              <th>Email</th>
              <th>Address</th>
              <th>Delivered</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr className={index % 2 === 0 ? 'even-row' : 'odd-row'} key={index}>
                <td>{order.orderTrees.map((orderedTree, index)=> <p key={index}>{orderedTree.name}</p>)}</td>
                <td>{order.orderAmount}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.email}</td>
                <td>{
                  <p> Address:{order.shippingAddress.address}</p>
                    }
                    {
                      <p>City: {order.shippingAddress.city}</p>
                    }
                    {
                      <p>Phone: {order.shippingAddress.phone}</p>
                    }
                    {
                      <p>Pincode: {order.shippingAddress.pincode}</p>
                    }
                    {
                      <p>Landmark: {order.shippingAddress.landmark}</p>
                    }
                    {
                      <p>State: {order.shippingAddress.state}</p>
                    }
                </td>
                <td>{order.isDelivered ? "Delivered✅" : (
                  <button className="mark-delivered" onClick={ () => order.isCancelled ? "" : dispatch(deliveredOrderMark(order._id))}>{order.isCancelled ? "Order Cancelled" : "Mark"}</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
