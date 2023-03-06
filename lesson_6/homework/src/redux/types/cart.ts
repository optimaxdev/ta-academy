export type CartItemT = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type NewCartItemT = Omit<CartItemT, 'id'>;

export type CartStateT = {
  isLoading: boolean;
  openAddForm: boolean;
  items: Array<CartItemT>;
};

export enum Constants {
  GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST',
  GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS',
  GET_ITEMS_ERROR = 'GET_ITEMS_ERROR',
  OPEN_ADD_FORM = 'OPEN_ADD_FORM',
  CLOSE_ADD_FORM = 'CLOSE_ADD_FORM',
  ADD_ITEM = 'ADD_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
  INCREMENT_QUANTITY = 'INCREMENT_QUANTITY',
  DECREMENT_QUANTITY = 'DECREMENT_QUANTITY',
}
