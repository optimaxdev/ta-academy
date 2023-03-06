import { CartItemT } from 'redux/types/cart';

// const URL = 'api/cart.json';
const URL = 'https://mocki.io/v1/a92eda42-69d0-43c5-bc66-cd56e4b8c906';

export const getCartItemsApi = async (): Promise<Array<CartItemT>> => {
  return await fetch(URL).then((res) => res.json());
};
