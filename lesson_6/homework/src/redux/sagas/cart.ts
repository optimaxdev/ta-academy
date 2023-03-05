import { call, put, takeEvery } from 'redux-saga/effects';
import { CartItemT, Constants } from '../types/cart';
import { getCartItemsApi } from '../../api/cartApi';
import { getItems, getItemsError } from '../actions/cart';

function* fetchCart() {
  try {
    const cartItems: Array<CartItemT> = yield call(getCartItemsApi);
    yield put(getItems(cartItems));
  } catch (e) {
    yield put(getItemsError());
  }
}

export function* cartSaga() {
  yield takeEvery(Constants.GET_ITEMS_REQUEST, fetchCart);
}
