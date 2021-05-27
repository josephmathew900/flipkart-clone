import React, { useState } from 'react';
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';

const CartItem = (props) => {
  const { _id, name, price, img, qty } = props.cartItem;

  const onQuantityIncrement = () => {
    props.onQuantityInc(_id);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    props.onQuantityDec(_id);
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt={''} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>Rs. {price}</p>
          </div>
          <div>Delivery in 3 - 5 days</div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          margin: '5px 0',
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={qty} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button
          className="cartActionBtn"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
