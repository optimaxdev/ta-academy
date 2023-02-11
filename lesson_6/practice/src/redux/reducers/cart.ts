import { CartStateT, CartItemT, Constants } from '../types/cart';
import { ActionT } from '../actions/cart';
import { pushToDataLayer } from 'dataLayer/dataLayer';

const initialState = {
  isLoading: true,
  openAddForm: false,
  items: [],
};

// Shitty code by stercore / dont judge pls
const getFromItem = (
  items: CartItemT[],
  id: number,
  field: keyof CartItemT
) => {
  const item = items.find((item) => item.id === id);
  if (!item) {
    return '';
  }
  return item[field];
};

export const cartReducer = (
  state: CartStateT = initialState,
  action: ActionT
) => {
  switch (action.type) {
    case Constants.GET_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case Constants.GET_ITEMS_ERROR:
      return {
        ...state,
        // Hey, do it really was needed?
        // items: [],
        isLoading: false,
      };
    case Constants.OPEN_ADD_FORM:
      pushToDataLayer({
        name: 'FormInteraction',
        value: 'Open',
      });
      return {
        ...state,
        openAddForm: true,
      };
    case Constants.CLOSE_ADD_FORM:
      pushToDataLayer({
        name: 'FormInteraction',
        value: 'Close',
      });
      return {
        ...state,
        openAddForm: false,
      };
    case Constants.ADD_ITEM:
      pushToDataLayer({
        name: 'AddItem',
        value: action.payload.name,
      });
      return {
        ...state,
        items: [
          {
            ...action.payload,
            id: getNextId(state.items),
          },
          ...state.items,
        ],
        openAddForm: false,
      };
    case Constants.INCREMENT_QUANTITY:
      pushToDataLayer({
        name: 'DecrementQuantity',
        value: getFromItem(state.items, action.payload, 'name'),
      });
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            item.quantity = item.quantity + 1;
          }
          return item;
        }),
      };
    case Constants.DECREMENT_QUANTITY:
      pushToDataLayer({
        name: 'IncrementQuantity',
        value: getFromItem(state.items, action.payload, 'name'),
      });
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            if (item.quantity > 1) item.quantity = item.quantity - 1;
          }
          return item;
        }),
      };
    case Constants.DELETE_ITEM:
      pushToDataLayer({
        name: 'DeleteItem',
        value: getFromItem(state.items, action.payload, 'name'),
      });
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

/**
 * Get Next Id for new cart item
 * @param items: array of cart items
 */
const getNextId = (items: Array<CartItemT>) =>
  items.reduce((max: number, item) => (max < item.id ? item.id : max), 0) + 1;
