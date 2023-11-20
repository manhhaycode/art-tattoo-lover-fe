import React, { useState, ChangeEvent } from 'react';

const CardPayment: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleCardHolderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardHolder(e.target.value);
  };

  const handleExpiryDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  const handleCvcChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value);
  };

  return (
    <div className="card-payment">
      <h2>Card Payment</h2>
      <div className="form-group">
        <label>Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="Enter card number"
        />
      </div>
      <div className="form-group">
        <label>Card Holder:</label>
        <input
          type="text"
          value={cardHolder}
          onChange={handleCardHolderChange}
          placeholder="Enter card holder's name"
        />
      </div>
      <div className="form-group">
        <label>Expiry Date:</label>
        <input
          type="text"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          placeholder="MM/YYYY"
        />
      </div>
      <div className="form-group">
        <label>CVC:</label>
        <input
          type="text"
          value={cvc}
          onChange={handleCvcChange}
          placeholder="Enter CVC"
        />
      </div>
      <button className="pay-button">Pay Now</button>
    </div>
  );
};

export default CardPayment;