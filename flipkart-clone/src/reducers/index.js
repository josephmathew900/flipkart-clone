import categoryReducer from './category.reducers';
import productReducer from './product.reducers';
import authReducer from './auth.reducers';
import cartReducer from './cart.reducers';
import userReducer from './user.reducers';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
