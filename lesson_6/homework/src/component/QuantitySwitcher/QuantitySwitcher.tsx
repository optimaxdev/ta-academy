import React from 'react';
import './QuantitySwitcher.scss';

type QuantitySwitcherP = {
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
};

export const QuantitySwitcher = ({
  quantity,
  decrementQuantity,
  incrementQuantity,
}: QuantitySwitcherP) => {
  return (
    <div className={'quantity-switcher'}>
      <button
        type={'button'}
        className="quantity-switcher__btn btn btn_small"
        onClick={decrementQuantity}
        disabled={quantity <= 1}
      >
        -
      </button>
      <div
        className="quantity-switcher__current"
        data-testid={'quantity-current'}
      >
        {quantity}
      </div>
      <button
        type={'button'}
        className="quantity-switcher__btn btn btn_small"
        onClick={incrementQuantity}
      >
        +
      </button>
    </div>
  );
};
