import './CartItem.scss';
import React from 'react';
import { CartItemT } from '../../redux/types/cart';
import { QuantitySwitcher } from '../QuantitySwitcher/QuantitySwitcher';

type CartItemP = {
  item: CartItemT;
  deleteItem: () => void;
  decrementQuantity: () => void;
  incrementQuantity: () => void;
};

export const CartItem: React.FC<CartItemP> = ({
  item,
  deleteItem,
  decrementQuantity,
  incrementQuantity,
}) => {
  return (
    <div className={'cart-item'} data-testid={'cart-item'}>
      <div className="cart-item__body">
        <div className="cart-item__content">
          <h2 className="cart-item__name">{item.name}</h2>
          <CartItemPrice price={item.price} quantity={item.quantity} />
        </div>
        <div className="cart-item__actions">
          <button
            data-testid="delete-btn"
            type={'button'}
            className="cart-item__delete-btn btn btn_small"
            onClick={deleteItem}
          />
          <QuantitySwitcher
            quantity={item.quantity}
            decrementQuantity={decrementQuantity}
            incrementQuantity={incrementQuantity}
          />
        </div>
      </div>
    </div>
  );
};

type CartItemPriceP = {
  quantity: number;
  price: number;
};

const CartItemPrice = ({ quantity, price }: CartItemPriceP) => {
  return (
    <div className={'cart-item__price'}>
      <div className="cart-item__fullprice">
        {(price * quantity).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </div>
      {quantity > 1 && (
        <div className="cart-item__price-for-one">
          {price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}{' '}
          × {quantity}
        </div>
      )}
    </div>
  );
};
