import React from "react";

const Payment = () => {
  return (
    <div className="modal">
      helo hello

      <h1>h
        h
        
      </h1>
      <form className="form">
       
        <div className="separator">
          <hr className="line" />
          <p>or pay using credit card</p>
          <hr className="line" />
        </div>
        <div className="credit-card-info--form">
          <div className="input_container">
            <label htmlFor="password_field" className="input_label">
              Card holder full name
            </label>
            <input
              id="password_field"
              className="input_field"
              type="text"
              name="input-name"
              title="Inpit title"
              placeholder="Enter your full name"
            />
          </div>
          <div className="input_container">
            <label htmlFor="password_field" className="input_label">
              Card Number
            </label>
            <input
              id="password_field"
              className="input_field"
              type="number"
              name="input-name"
              title="Inpit title"
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className="input_container">
            <label htmlFor="password_field" className="input_label">
              Expiry Date / CVV
            </label>
            <div className="split">
              <input
                id="password_field"
                className="input_field"
                type="text"
                name="input-name"
                title="Expiry Date"
                placeholder="01/23"
              />
              <input
                id="password_field"
                className="input_field"
                type="number"
                name="cvv"
                title="CVV"
                placeholder="CVV"
              />
            </div>
          </div>
        </div>
        <button className="purchase--btn">Checkout</button>
      </form>
    </div>
  );
};

export default Payment;
