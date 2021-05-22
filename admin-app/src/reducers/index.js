import authReducer from './auth.reducers';
import userReducer from './user.reducers';
import categoryReducer from './category.reducers';
import productReducer from './product.reducers';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
