import './CartPage.scss';

import { Page } from '../../component/Page/Page';
import { CartItem } from '../../component/CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  closeAddForm,
  decrementQuantity,
  deleteItem,
  getItemsRequest,
  incrementQuantity,
  openAddForm,
} from '../../redux/actions/cart';
import React from 'react';
import { CartItemT } from '../../redux/types/cart';
import { Form } from '../../component/Form/Form';
import { useEffect } from 'react';
import { Modal } from '../../component/Modal/Modal';
import { StateT } from '../../redux/store/store';

export const CartPage: React.FC = () => {
  const cart = useSelector((state: StateT) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch Data
    dispatch(getItemsRequest());
  }, [dispatch]);

  return (
    <Page title={'Shopping cart'}>
      {cart.isLoading ? (
        <div data-testid={'loading'}>Loading...</div>
      ) : (
        <div className={'cart'} data-testid={'cart'}>
          <div className="cart__bar">
            <button
              className={'btn btn_primary'}
              onClick={() => dispatch(openAddForm())}
            >
              Add Cart Item
            </button>
          </div>
          <div className="cart__list">
            {cart.items.length > 0 ? (
              cart.items.map((item: CartItemT) => (
                <CartItem
                  key={item.id}
                  item={item}
                  incrementQuantity={() => dispatch(incrementQuantity(item.id))}
                  decrementQuantity={() => dispatch(decrementQuantity(item.id))}
                  deleteItem={() => dispatch(deleteItem(item.id))}
                />
              ))
            ) : (
              <span>Cart is empty</span>
            )}
          </div>
          {cart.openAddForm && (
            <Modal close={() => dispatch(closeAddForm())}>
              <Form addItem={(cartItem) => dispatch(addItem(cartItem))} />
            </Modal>
          )}
        </div>
      )}
    </Page>
  );
};
