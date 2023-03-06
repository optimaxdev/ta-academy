import { CartItemT, Constants, NewCartItemT } from '../types/cart';

/**
 * Open modal form for adding new cart item
 */
export const openAddForm = () => ({ type: Constants.OPEN_ADD_FORM } as const);

/**
 * Close modal form
 */
export const closeAddForm = () => ({ type: Constants.CLOSE_ADD_FORM } as const);

/**
 * Add new cart item
 * @param cartItem
 *
 */

export const addItem = (cartItem: NewCartItemT) =>
  ({ type: Constants.ADD_ITEM, payload: cartItem } as const);

/**
 * delete cart item by id
 * @param id
 */
export const deleteItem = (id: number) =>
  ({ type: Constants.DELETE_ITEM, payload: id } as const);

/**
 * Increment quantity of cart item
 * @param id: number - cart item id
 */

export const incrementQuantity = (id: number) =>
  ({ type: Constants.INCREMENT_QUANTITY, payload: id } as const);

/**
 * Decrement quantity of cart item
 * @param id: number - cart item id
 */

export const decrementQuantity = (id: number) =>
  ({ type: Constants.DECREMENT_QUANTITY, payload: id } as const);

/**
 * Send request for get cart items data
 */
export const getItemsRequest = () =>
  ({ type: Constants.GET_ITEMS_REQUEST } as const);

/**
 * Get cart items data
 * @param cartItems
 */
export const getItems = (cartItems: Array<CartItemT>) =>
  ({ type: Constants.GET_ITEMS_SUCCESS, payload: cartItems } as const);

/**
 *
 */
export const getItemsError = () =>
  ({ type: Constants.GET_ITEMS_ERROR } as const);

export type ActionT =
  | ReturnType<typeof openAddForm>
  | ReturnType<typeof closeAddForm>
  | ReturnType<typeof addItem>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof incrementQuantity>
  | ReturnType<typeof decrementQuantity>
  | ReturnType<typeof getItemsRequest>
  | ReturnType<typeof getItems>
  | ReturnType<typeof getItemsError>;
