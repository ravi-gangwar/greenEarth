import StripeCheckout from 'react-stripe-checkout';
import {useDispatch} from 'react-redux'
import { placeOrder } from '../actions/orderAction';

function CheackOut({total}) {

  const dispatch = useDispatch();
  const tokenHandler = (token) => {
    dispatch(placeOrder(token, total))
    console.log(token)
  }
  return (
    <StripeCheckout
        amount={total*100}
        shippingAddress
        token={tokenHandler}
        stripeKey='pk_test_51OHyz1SB7yI7Si8Nh90kpRQBPIDSidKNxyKSdT49idzoM8IcAULsXJdJzFQ8l95bJ9M3xis06Xu2WUIDU5W4EFnM00xOnAp5Vi'
        currency='INR'

    >
      <button>Pay now</button>
    </StripeCheckout>
)
}

export default CheackOut
