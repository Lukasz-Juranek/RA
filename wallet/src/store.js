import { combineReducers ,createStore } from 'redux';

const view_reducer = (state = 'CATEGORY_VIEW', action) => {
    switch (action.type) {
        case 'SET_VIEW':
          return action.payload;
        default:         
          return state;
    }
};

const wallet_reducer = (state = [], action) => {
  return state;
}

const open_window_reducter = (state = {item_add : false}, action) =>
{
  let new_state = state;

  switch (action.type) {
    case 'ITEM_ADD_WINDOW_VISIBILITY':
      new_state.item_add = action.payload;
      return new_state;
    default:
      return state;
  }
}

const category_reducer = (state = 'Cash', action) => {
    switch (action.type) {
      case 'SET_CATEGORY':
        return action.payload;
      default:         
        return state;
  }
}


const reducers = combineReducers({
    active_view: view_reducer,
    active_category: category_reducer,
    wallet: wallet_reducer,
    windows: open_window_reducter
});

export default createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


