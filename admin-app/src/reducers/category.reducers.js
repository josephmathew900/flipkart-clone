import { categoryConstants } from '../actions/constants';

const initialState = {
  categories: [],
  error: null,
  loading: false,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  if (parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }

  for (let cat of categories) {
    if (cat._id == parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        children: category.children,
      };
      myCategories.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }

  return myCategories;
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      state = { ...state, loading: true };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
      state = { ...state, error: action.payload.error };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = { ...state, loading: true };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      state = {
        ...state,
        loading: false,
        categories: updatedCategories,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = { ...initialState };
      break;
    case categoryConstants.UPDATE_CATEGORIES_REQUEST:
      state = { ...state, loading: true };
      break;
    case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.UPDATE_CATEGORIES_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;
  }

  return state;
};

export default categoryReducer;
