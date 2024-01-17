import '../style/PaySuccess.css'

function PaySuccess() {
  return (
    <div className="pay-success-container">
      <div className="success-icon">&#10004;</div>
      <h1 className='h1-pay'>Payment Successful</h1>
      <p className='p-pay'>Thank you for your purchase!</p>
    </div>
  );
}

export default PaySuccess;
