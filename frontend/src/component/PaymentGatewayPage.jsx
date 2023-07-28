import React, { useState } from 'react';

const PaymentGatewayPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiDetails, setUpiDetails] = useState({ upiId: '', pin: '' });
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleUpiInputChange = (event) => {
    const { name, value } = event.target;
    setUpiDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCardInputChange = (event) => {
    const { name, value } = event.target;
    setCardDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (paymentMethod === 'UPI') {
      // Implement UPI payment logic here
      // ...
    } else if (paymentMethod === 'CARD') {
      // Implement card payment logic here
      // ...
    }
  };

  return (
    <div className='p-5 justify-content-center'>
    <div className='p-5 justify-content-center'>

      <h2>Payment Gateway</h2>

      <div>
        <input
          type="radio"
          name="paymentMethod"
          value="UPI"
          checked={paymentMethod === 'UPI'}
          onChange={handlePaymentMethodChange}
        />
        <label>UPI</label>
      </div>

      <div>
        <input
          type="radio"
          name="paymentMethod"
          value="CARD"
          checked={paymentMethod === 'CARD'}
          onChange={handlePaymentMethodChange}
        />
        <label>Card</label>
      </div>

      {paymentMethod === 'CARD' && (
        <form onSubmit={handleSubmit}>
          <h3>Card Payment</h3>
          <div>
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleCardInputChange}
            />
          </div>
          <div>
            <label>Expiry</label>
            <input
              type="text"
              name="expiry"
              value={cardDetails.expiry}
              onChange={handleCardInputChange}
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardInputChange}
            />
          </div>
          <button type="submit">Pay Now</button>
        </form>
      )}

      {paymentMethod === 'UPI' && (
        <form onSubmit={handleSubmit}>
          <h3>UPI Payment</h3>
          <div>
            <label>UPI ID</label>
            <input
              type="text"
              name="upiId"
              value={upiDetails.upiId}
              onChange={handleUpiInputChange}
            />
          </div>
          <div>
            <label>UPI PIN</label>
            <input
              type="password"
              name="pin"
              value={upiDetails.pin}
              onChange={handleUpiInputChange}
            />
          </div>
          <button type="submit">Pay Now</button>
        </form>
      )}
    </div>
    </div>
  );
};

export default PaymentGatewayPage;
