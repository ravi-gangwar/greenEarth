import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderAction, getUserOrders } from "../actions/orderAction.js";
import Loader from "../components/Loader.jsx";
import "../style/orderList.css";

function OrdersList() {
  const { orders, loading, error } = useSelector((state) => state.getUserOrdersReducer);
  const dispatch = useDispatch();

  const cancelOrderState = useSelector((state) => state.cancelOrderReducer);
  const { cancelLoading } = cancelOrderState;

  function handleRating() {
    alert("This feature not available");
  }

  function handleCancelOrder(orderId) {
    dispatch(cancelOrderAction(orderId));
  }

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div className="orderList-page">

      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : orders && orders.length === 0 ? (
        <h1 className="zero-orders">You have <span>ZERO</span> orders.</h1>
      ) : (

        <>
            <h1>Your Ordered Tree</h1>
            <div className="order-cards-list">
            {
              orders && orders.map((order, index) => (
                <div className={order.isCancelled ? "cancel-order-tree-card" : "order-tree-card"} key={index}>
                    <div className="first-inside-div">
                      <span>Ordered Trees: <h3>{order.orderTrees.length}</h3></span>
                      <span>Ordered Date: <h3>{new Date(order.createdAt).toLocaleDateString()}</h3></span>
                    </div>
                    <div className="second-inside-div">
                      <span>Expected Delivery: <h3>Soon...</h3></span>
                      <span>
                        {order.isDelivered ? (
                          <button onClick={() => handleRating()} className="rate-button-orders">Rate</button>
                        ) : (
                          <button disabled= {order.isCancelled} onClick={() => handleCancelOrder(order._id)} className="cancel-button-orders">
                            {order.isCancelled ? "Cancelled" : cancelLoading ? "Loading..." : "Cancel Order"}
                          </button>
                        )}
                      </span>
                    </div>
                </div>
              ))
            }
            </div>
        </>
      )}
    </div>
  );
}

export default OrdersList;
